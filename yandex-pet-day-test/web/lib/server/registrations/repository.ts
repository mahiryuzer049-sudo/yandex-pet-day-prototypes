import "server-only";

import type { RegistrationRequest } from "@/lib/validation/registration";

export interface RegistrationRecord extends RegistrationRequest {
  id: string;
  createdAt: string;
}

export interface RegistrationSaveResult {
  id: string;
  storage: "postgres" | "file";
}

export interface RegistrationRepository {
  save(payload: RegistrationRequest): Promise<RegistrationSaveResult>;
}
