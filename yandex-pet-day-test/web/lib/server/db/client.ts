import "server-only";

import postgres, { type Sql } from "postgres";

import { env } from "@/lib/env";

declare global {
  var __yandexPetDaySql: Sql | undefined;
}

export function getSqlClient(): Sql | null {
  if (!env.databaseUrl) {
    return null;
  }

  if (!globalThis.__yandexPetDaySql) {
    globalThis.__yandexPetDaySql = postgres(env.databaseUrl, {
      prepare: false,
      max: 1,
    });
  }

  return globalThis.__yandexPetDaySql;
}
