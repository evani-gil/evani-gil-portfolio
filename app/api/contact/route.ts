import { NextResponse } from "next/server";

import { handleContactSubmission } from "@/lib/contact";
import { type ContactFormInput } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: ContactFormInput;

  try {
    payload = (await request.json()) as ContactFormInput;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid JSON payload."
      },
      { status: 400 }
    );
  }

  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const result = await handleContactSubmission(payload, {
    ipAddress,
    userAgent: request.headers.get("user-agent")
  });

  return NextResponse.json(result.body, { status: result.status });
}
