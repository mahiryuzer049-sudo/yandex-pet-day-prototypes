import { chromium, devices } from "playwright";

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
    name: "iPhone 11",
    device: "iPhone 11",
    windowSize: { width: 520, height: 980 },
  },
  {
    name: "iPad Pro 11",
    device: "iPad Pro 11",
    windowSize: { width: 980, height: 1320 },
  },
];

async function openPreview(targetUrl, preset) {
  const browser = await chromium.launch({
    headless: false,
    args: [`--window-size=${preset.windowSize.width},${preset.windowSize.height}`],
  });

  const context = await browser.newContext({
    ...devices[preset.device],
  });

  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.bringToFront();

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
