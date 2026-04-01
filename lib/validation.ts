import { z } from "zod";

import { sanitizePlainText } from "@/lib/utils";

const messageMinLength = 20;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Please share your name.")
    .max(80, "Name is too long.")
    .transform(sanitizePlainText),
  email: z
    .string()
    .email("Enter a valid email address.")
    .max(120, "Email is too long.")
    .transform((value) => sanitizePlainText(value).toLowerCase()),
  company: z
    .string()
    .max(120, "Company name is too long.")
    .optional()
    .transform((value) => (value ? sanitizePlainText(value) : "")),
  message: z
    .string()
    .min(messageMinLength, `Message should be at least ${messageMinLength} characters.`)
    .max(2000, "Message is too long.")
    .transform(sanitizePlainText),
  website: z.string().max(0, "Bot submission detected.").optional().default("")
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;
