import { devices, webkit } from "playwright";

const DEFAULT_URL = "https://mahiryuzer049-sudo.github.io/yandex-pet-day-prototypes/variant-a/";

function parseArgs(argv) {
  const args = { url: DEFAULT_URL };

  for (const entry of argv.slice(2)) {
    if (entry.startsWith("--url=")) {
      args.url = entry.slice("--url=".length);
    }
  }

  return args;
}

const PRESETS = [
  {
    name: "iPhone 11 Safari",
    device: "iPhone 11",
  },
  {
    name: "iPad Pro 11 Safari",
    device: "iPad Pro 11",
  },
];

async function openPreview(targetUrl, preset) {
  const browser = await webkit.launch({
    headless: false,
  });

  const context = await browser.newContext({
    ...devices[preset.device],
  });

  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.bringToFront();
  await page.setViewportSize(devices[preset.device].viewport);

  return browser;
}

async function main() {
  const { url } = parseArgs(process.argv);
  const browsers = [];

  for (const preset of PRESETS) {
    const browser = await openPreview(url, preset);
    browsers.push(browser);
  }

  const interval = setInterval(() => {
    const alive = browsers.some((browser) => browser.isConnected());
    if (!alive) {
      clearInterval(interval);
      process.exit(0);
    }
  }, 1000);

  const shutdown = async () => {
    clearInterval(interval);
    await Promise.all(
      browsers.map(async (browser) => {
        if (browser.isConnected()) {
          await browser.close();
        }
      }),
    );
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
