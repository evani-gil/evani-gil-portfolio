"use client";

import type { FormEvent, InputHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/data/site";
import { contactFormSchema, type ContactFormInput } from "@/lib/validation";
import { Section } from "@/components/ui/section";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

const initialValues: ContactFormInput = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: ""
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormInput>(initialValues);
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactFormSchema.safeParse(values);

    if (!parsed.success) {
      setState({
        status: "error",
        message: "Please check the form fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors
      });
      return;
    }

    setSubmitting(true);
    setState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: Record<string, string[]>;
      };

      if (!response.ok) {
        setState({
          status: "error",
          message: result.message,
          fieldErrors: result.errors
        });
        return;
      }

      setState({
        status: "success",
        message: result.message
      });
      setValues(initialValues);
    } catch {
      setState({
        status: "error",
        message: "Unable to send your message right now."
      });
    } finally {
      setSubmitting(false);
    }
  }

  function updateValue<K extends keyof ContactFormInput>(key: K, value: ContactFormInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <Section id="contact">
      <div className="section-shell grid gap-12 md:grid-cols-2">
        <div>
          <p className="section-kicker mb-4">Contact</p>
          <h2 id="contact-heading" className="section-heading">
            Let&apos;s build something reliable
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Whether you need a developer who understands the full lifecycle or someone who can bring order to delivery,
            quality, and execution, I&apos;m ready to connect.
          </p>

          <div className="mt-10 space-y-5">
            <ContactLink href={`mailto:${siteConfig.email}`} label="Email" value={siteConfig.email} icon={<Mail className="h-5 w-5" />} />
            <ContactLink href={siteConfig.githubUrl} label="GitHub" value="evani-gil" icon={<Github className="h-5 w-5" />} external />
            <ContactLink href={siteConfig.linkedInUrl} label="LinkedIn" value="evanigil" icon={<Linkedin className="h-5 w-5" />} external />
          </div>
        </div>

        <div className="surface-card p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                label="Name"
                value={values.name}
                error={state.fieldErrors?.name?.[0]}
                onChange={(value) => updateValue("name", value)}
              />
              <FormField
                label="Email"
                type="email"
                value={values.email}
                error={state.fieldErrors?.email?.[0]}
                onChange={(value) => updateValue("email", value)}
              />
            </div>
            <FormField
              label="Company"
              value={values.company ?? ""}
              error={state.fieldErrors?.company?.[0]}
              onChange={(value) => updateValue("company", value)}
            />
            <div className="hidden" aria-hidden="true">
              <FormField
                label="Website"
                value={values.website ?? ""}
                error={state.fieldErrors?.website?.[0]}
                onChange={(value) => updateValue("website", value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Message</label>
              <textarea
                rows={5}
                value={values.message}
                onChange={(event) => updateValue("message", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
                placeholder="Tell me about your project, role, or what you need help solving."
              />
              {state.fieldErrors?.message?.[0] ? (
                <p className="text-sm text-rose-600">{state.fieldErrors.message[0]}</p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? "Sending Message" : "Send Message"}
            </button>
            {state.message ? (
              <p className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-rose-600"}>
                {state.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </Section>
  );
}

function ContactLink({
  href,
  label,
  value,
  icon,
  external = false
}: Readonly<{
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
}>) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition group-hover:border-cyan-200 group-hover:text-cyan-700">
        {icon}
      </span>
      <span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
        <span className="mt-1 block font-semibold text-slate-950">{value}</span>
      </span>
    </Link>
  );
}

function FormField({
  label,
  type = "text",
  value,
  error,
  onChange,
  ...rest
}: Readonly<{
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        {...rest}
      />
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
