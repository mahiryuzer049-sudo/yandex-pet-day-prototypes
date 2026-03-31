import { chromium, devices } from "playwright";

function parseArgs(argv) {
  const result = {};

  for (const entry of argv) {
    if (!entry.startsWith("--")) continue;

    const [rawKey, ...valueParts] = entry.slice(2).split("=");
    const key = rawKey.trim();
    const value = valueParts.length > 0 ? valueParts.join("=") : "true";
    result[key] = value;
  }

  return result;
}

function parseViewport(value) {
  if (!value) return { width: 1440, height: 1200 };

  const [width, height] = value.split("x").map((item) => Number.parseInt(item, 10));

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error(`Invalid viewport: ${value}`);
  }

  return { width, height };
}

async function waitForFonts(page) {
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }
  });
}

async function waitForContent(page, minimumTextLength) {
  await page.waitForFunction(
    (min) => {
      const text = document.body?.innerText ?? "";
      return text.replace(/\s+/g, " ").trim().length >= min;
    },
    minimumTextLength,
  );
}

async function scrollToHash(page, url) {
  const parsed = new URL(url);
  const hash = parsed.hash?.replace(/^#/, "");
  if (!hash) return;

  await page.evaluate((targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, hash);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const url = args.url;
  const output = args.output;

  if (!url || !output) {
    throw new Error("Usage: npm run capture -- --url=http://127.0.0.1:3000/variant-a --output=output/playwright/file.png [--device=iPhone 13|--viewport=1440x1200] [--selector=.page]");
  }

  const selector = args.selector || "body";
  const timeout = Number.parseInt(args.timeout ?? "30000", 10);
  const waitMs = Number.parseInt(args.wait ?? "900", 10);
  const minimumTextLength = Number.parseInt(args.minText ?? "120", 10);

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const contextOptions = args.device
      ? { ...devices[args.device] }
      : { viewport: parseViewport(args.viewport) };

    const context = await browser.newContext({
      locale: "ru-RU",
      colorScheme: "light",
      ...contextOptions,
    });

    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout });
    await page.waitForSelector(selector, { state: "visible", timeout });
    await waitForContent(page, minimumTextLength);
    await waitForFonts(page);
    await scrollToHash(page, url);
    await page.waitForTimeout(waitMs);
    await page.screenshot({
      path: output,
      fullPage: args.fullPage === "true",
    });

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
