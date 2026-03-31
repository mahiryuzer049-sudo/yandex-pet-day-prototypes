import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { dirname, resolve } from "node:path";

import { env } from "@/lib/env";
import type { RegistrationRecord, RegistrationRepository, RegistrationSaveResult } from "@/lib/server/registrations/repository";
import type { RegistrationRequest } from "@/lib/validation/registration";

export class FileRegistrationRepository implements RegistrationRepository {
  async save(payload: RegistrationRequest): Promise<RegistrationSaveResult> {
    const filePath = resolve(/* turbopackIgnore: true */ process.cwd(), env.fileRegistrationPath);
    const nextItem: RegistrationRecord = {
      ...payload,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await mkdir(dirname(filePath), { recursive: true });

    const existing: RegistrationRecord[] = await readFile(filePath, "utf8")
      .then((content) => JSON.parse(content) as RegistrationRecord[])
      .catch((): RegistrationRecord[] => []);

    existing.push(nextItem);
    await writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");

    return {
      id: nextItem.id,
      storage: "file",
    };
  }
}
