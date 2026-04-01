import { beforeEach, describe, expect, it, vi } from "vitest";

import { handleContactSubmission } from "@/lib/contact";

describe("handleContactSubmission", () => {
  beforeEach(() => {
    process.env.CONTACT_FROM_EMAIL = "Portfolio <onboarding@example.com>";
    process.env.CONTACT_TO_EMAIL = "evanigil@gmail.com";
  });

  it("returns success for a valid request", async () => {
    const send = vi.fn().mockResolvedValue(undefined);

    const result = await handleContactSubmission(
      {
        name: "Jordan Example",
        email: "jordan@example.com",
        company: "Example Inc",
        message: "I would love to talk about a full stack contract role for an upcoming launch.",
        website: ""
      },
      { ipAddress: "127.0.0.1", userAgent: "vitest" },
      { send }
    );

    expect(result.status).toBe(200);
    expect(result.body.ok).toBe(true);
    expect(send).toHaveBeenCalledOnce();
  });

  it("returns validation errors when the payload is invalid", async () => {
    const send = vi.fn().mockResolvedValue(undefined);

    const result = await handleContactSubmission(
      {
        name: "A",
        email: "not-an-email",
        company: "",
        message: "short",
        website: ""
      },
      { ipAddress: "127.0.0.2", userAgent: "vitest" },
      { send }
    );

    expect(result.status).toBe(400);
    expect(result.body.ok).toBe(false);
    expect(result.body.errors?.email).toBeDefined();
    expect(send).not.toHaveBeenCalled();
  });
});
