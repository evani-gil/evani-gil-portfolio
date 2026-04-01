import { Resend } from "resend";
import { ZodError } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema, type ContactFormInput } from "@/lib/validation";

interface ContactRequestMeta {
  ipAddress: string;
  userAgent?: string | null;
}

interface Mailer {
  send(payload: {
    from: string;
    to: string[];
    replyTo: string;
    subject: string;
    text: string;
  }): Promise<void>;
}

export interface ContactHandlerResult {
  status: number;
  body: {
    ok: boolean;
    message: string;
    errors?: Record<string, string[]>;
  };
}

function getMailer(): Mailer {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Contact service is not configured.");
  }

  const resend = new Resend(apiKey);

  return {
    async send(payload) {
      await resend.emails.send({
        from: payload.from,
        to: payload.to,
        replyTo: payload.replyTo,
        subject: payload.subject,
        text: payload.text
      });
    }
  };
}

export async function handleContactSubmission(
  payload: ContactFormInput,
  meta: ContactRequestMeta,
  mailer?: Mailer
): Promise<ContactHandlerResult> {
  const limited = checkRateLimit(meta.ipAddress);

  if (!limited.allowed) {
    return {
      status: 429,
      body: {
        ok: false,
        message: `Too many requests. Please try again in ${limited.retryAfter} seconds.`
      }
    };
  }

  try {
    const data = contactFormSchema.parse(payload);
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!toEmail || !fromEmail) {
      return {
        status: 503,
        body: {
          ok: false,
          message: "Contact service is temporarily unavailable."
        }
      };
    }

    const companyLine = data.company ? `Company: ${data.company}\n` : "";
    const resolvedMailer = mailer ?? getMailer();

    await resolvedMailer.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `Portfolio inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        companyLine.trimEnd(),
        "",
        "Message:",
        data.message,
        "",
        `IP: ${meta.ipAddress}`,
        `User Agent: ${meta.userAgent ?? "Unknown"}`
      ]
        .filter(Boolean)
        .join("\n")
    });

    return {
      status: 200,
      body: {
        ok: true,
        message: "Thanks for reaching out. Your message has been sent."
      }
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: 400,
        body: {
          ok: false,
          message: "Please check the form fields and try again.",
          errors: error.flatten().fieldErrors
        }
      };
    }

    console.error("Contact submission failed", error);

    return {
      status: 500,
      body: {
        ok: false,
        message: "Something went wrong while sending your message."
      }
    };
  }
}
