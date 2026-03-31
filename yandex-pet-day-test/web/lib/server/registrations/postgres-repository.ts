import "server-only";

import { getSqlClient } from "@/lib/server/db/client";
import type { RegistrationRepository, RegistrationSaveResult } from "@/lib/server/registrations/repository";
import type { RegistrationRequest } from "@/lib/validation/registration";

export class PostgresRegistrationRepository implements RegistrationRepository {
  async save(payload: RegistrationRequest): Promise<RegistrationSaveResult> {
    const sql = getSqlClient();

    if (!sql) {
      throw new Error("DATABASE_URL is missing, but postgres storage was requested.");
    }

    const rows = await sql<{ id: string }[]>`
      insert into conference_registrations (
        event_slug,
        attendee_name,
        email,
        attendance_format,
        source_variant
      ) values (
        ${payload.eventSlug},
        ${payload.name},
        ${payload.email},
        ${payload.format},
        ${payload.sourceVariant}
      )
      returning id
    `;

    return {
      id: rows[0].id,
      storage: "postgres",
    };
  }
}
