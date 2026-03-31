import { z } from "zod";

export const attendanceFormatSchema = z.enum(["offline", "online"]);

export const registrationRequestSchema = z.object({
  eventSlug: z.string().trim().min(1),
  sourceVariant: z.enum(["variant-a", "variant-b"]),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(255),
  format: attendanceFormatSchema,
});

export type RegistrationRequest = z.infer<typeof registrationRequestSchema>;
