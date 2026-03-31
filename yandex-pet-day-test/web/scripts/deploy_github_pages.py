from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

from export_github_pages import DEPLOY_DIR, main as export_main


ROOT = Path(__file__).resolve().parents[1]


def run(command: list[str], cwd: Path) -> str:
    completed = subprocess.run(
        command,
        cwd=cwd,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    return completed.stdout.strip()


def ensure_build() -> None:
    subprocess.run(
        ["npm", "run", "build"],
        cwd=ROOT,
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--message",
        default="Deploy export integrity fix",
        help="Git commit message for the deploy repo.",
    )
    parser.add_argument(
        "--skip-build",
        action="store_true",
        help="Reuse the current Next build instead of running npm run build.",
    )
    args = parser.parse_args()

    if not args.skip_build:
        ensure_build()

    export_main()

    run(["git", "add", "-A"], cwd=DEPLOY_DIR)
    status = run(["git", "status", "--short"], cwd=DEPLOY_DIR)

    if not status:
        print("Deploy repo is already up to date.")
        return

    run(["git", "commit", "-m", args.message], cwd=DEPLOY_DIR)
    subprocess.run(["git", "push"], cwd=DEPLOY_DIR, check=True)
    print("Deploy repo committed and pushed.")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as error:
        raise SystemExit(error.returncode) from error
