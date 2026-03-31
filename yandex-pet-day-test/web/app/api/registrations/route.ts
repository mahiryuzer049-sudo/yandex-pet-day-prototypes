import { NextResponse } from "next/server";

import { registerConferenceVisitor } from "@/lib/server/registrations/service";
import { registrationRequestSchema } from "@/lib/validation/registration";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = registrationRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  try {
    const result = await registerConferenceVisitor(parsed.data);

    return NextResponse.json({
      ok: true,
      registrationId: result.id,
      storage: result.storage,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected registration error.";

    return NextResponse.json(
      {
        ok: false,
        error: "registration_failed",
        message,
      },
      { status: 500 },
    );
  }
}
