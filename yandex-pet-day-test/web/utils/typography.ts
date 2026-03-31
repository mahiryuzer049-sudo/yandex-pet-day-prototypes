const NBSP = "\u00A0";
const PREPS =
  /(\s|^)(а|в|во|г|д|да|до|е|ж|за|и|из|из-за|из-под|к|ко|на|над|не|ни|но|о|об|от|по|под|при|про|с|со|то|у|уж)(\s)/gi;
const TIME_RANGE = /(\d{1,2}:\d{2})\s*[-—–]\s*(\d{1,2}:\d{2})/g;
const NUMBER_RANGE = /(\d+)\s*[-—–]\s*(\d+)/g;
const UNIT_SPACE =
  /(\d+)\s+(мин|МИН|минута|минуты|минут|день|дня|дней|доклад|доклада|докладов|формат|формата|форматов|спикер|спикера|спикеров|слот|слота|слотов|человек)\b/g;

export function fixTypography(text: string): string {
  if (!text) return text;

  let result = text;

  result = result.replace(/\.{3}/g, "…");
  result = result.replace(/"([^"]+)"/g, "«$1»");
  result = result.replace(TIME_RANGE, "$1–$2");
  result = result.replace(NUMBER_RANGE, "$1–$2");
  result = result.replace(/\s-\s/g, `${NBSP}— `);
  result = result.replace(UNIT_SPACE, `$1${NBSP}$2`);
  result = result.replace(PREPS, `$1$2${NBSP}`);
  result = result.replace(PREPS, `$1$2${NBSP}`);
  result = result.replace(/  +/g, " ");

  return result.trim();
}

export function fixTypographyDeep<T>(value: T): T {
  if (typeof value === "string") {
    return fixTypography(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => fixTypographyDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, fixTypographyDeep(entry)]),
    ) as T;
  }

  return value;
}
