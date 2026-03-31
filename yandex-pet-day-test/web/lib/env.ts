import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().trim().min(1).optional(),
  REGISTRATION_STORAGE: z.enum(["auto", "postgres", "file"]).default("auto"),
  FILE_REGISTRATION_PATH: z.string().trim().min(1).default(".data/registrations.json"),
});

const parsed = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  REGISTRATION_STORAGE: process.env.REGISTRATION_STORAGE,
  FILE_REGISTRATION_PATH: process.env.FILE_REGISTRATION_PATH,
});

export const env = {
  databaseUrl: parsed.DATABASE_URL,
  registrationStorage: parsed.REGISTRATION_STORAGE,
  fileRegistrationPath: parsed.FILE_REGISTRATION_PATH,
};
