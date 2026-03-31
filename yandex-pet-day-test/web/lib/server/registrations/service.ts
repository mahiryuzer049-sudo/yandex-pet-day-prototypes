import "server-only";

import { env } from "@/lib/env";
import { FileRegistrationRepository } from "@/lib/server/registrations/file-repository";
import { PostgresRegistrationRepository } from "@/lib/server/registrations/postgres-repository";
import type { RegistrationRepository } from "@/lib/server/registrations/repository";
import type { RegistrationRequest } from "@/lib/validation/registration";

function createRegistrationRepository(): RegistrationRepository {
  if (env.registrationStorage === "postgres") {
    return new PostgresRegistrationRepository();
  }

  if (env.registrationStorage === "file") {
    return new FileRegistrationRepository();
  }

  return env.databaseUrl
    ? new PostgresRegistrationRepository()
    : new FileRegistrationRepository();
}

export async function registerConferenceVisitor(payload: RegistrationRequest) {
  const repository = createRegistrationRepository();
  return repository.save(payload);
}
