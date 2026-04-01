import { describe, expect, it } from "vitest";

import { sanitizePlainText } from "@/lib/utils";
import { contactFormSchema } from "@/lib/validation";

describe("sanitizePlainText", () => {
  it("removes tags and control characters", () => {
    expect(sanitizePlainText(" <b>Hello</b>\nthere\t")).toBe("Hello there");
  });
});

describe("contactFormSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactFormSchema.parse({
      name: "Evani Gil",
      email: "EVANI@example.com",
      company: "Example Co",
      message: "I would like to discuss a frontend engineering opportunity.",
      website: ""
    });

    expect(parsed.email).toBe("evani@example.com");
  });

  it("rejects a honeypot submission", () => {
    const parsed = contactFormSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      company: "",
      message: "This message is definitely long enough to be valid otherwise.",
      website: "https://spam.example"
    });

    expect(parsed.success).toBe(false);
  });
});
