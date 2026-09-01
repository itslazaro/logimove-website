"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/config/site";
import { buildContactMessage, openWhatsApp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (values.message.trim().length < 10)
    errors.message = "Please enter a message of at least 10 characters.";
  return errors;
}

const fields: Array<{
  name: keyof FormValues;
  label: string;
  type: string;
  required: boolean;
  autoComplete: string;
  textarea?: boolean;
}> = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company", type: "text", required: false, autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone Number", type: "tel", required: false, autoComplete: "tel" },
  { name: "message", label: "Message", type: "text", required: true, autoComplete: "off", textarea: true },
];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = buildContactMessage(values);

  const setField = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstError = fields.find((f) => nextErrors[f.name]);
      if (firstError) document.getElementById(`field-${firstError.name}`)?.focus();
      return;
    }
    const opened = openWhatsApp(message);
    if (opened) setSubmitted(true);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the message stays visible for manual copy */
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) =>
          field.textarea ? (
            <div key={field.name} className="sm:col-span-2">
              <label htmlFor={`field-${field.name}`} className="mb-1.5 block text-sm font-medium text-ink-900">
                {field.label}
                {field.required ? <span aria-hidden className="text-brand-600"> *</span> : null}
              </label>
              <textarea
                id={`field-${field.name}`}
                name={field.name}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
                rows={5}
                required={field.required}
                aria-required={field.required}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-2.5 text-base text-ink-900 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20",
                  errors[field.name] ? "border-error" : "border-gray-200",
                )}
              />
              {errors[field.name] ? (
                <p id={`error-${field.name}`} role="alert" className="mt-1.5 text-sm text-error">
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          ) : (
            <div key={field.name}>
              <label htmlFor={`field-${field.name}`} className="mb-1.5 block text-sm font-medium text-ink-900">
                {field.label}
                {field.required ? <span aria-hidden className="text-brand-600"> *</span> : null}
              </label>
              <input
                id={`field-${field.name}`}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
                autoComplete={field.autoComplete}
                required={field.required}
                aria-required={field.required}
                aria-invalid={Boolean(errors[field.name])}
                aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-2.5 text-base text-ink-900 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20",
                  errors[field.name] ? "border-error" : "border-gray-200",
                )}
              />
              {errors[field.name] ? (
                <p id={`error-${field.name}`} role="alert" className="mt-1.5 text-sm text-error">
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          ),
        )}
      </div>

      <div className="rounded-2xl bg-brand-50 p-5">
        <p className="text-sm leading-relaxed text-ink-800">
          When you click <strong>Contact Us</strong>, we&apos;ll open WhatsApp with a pre-filled message to{" "}
          {site.whatsappDisplay}. No form data is stored on this website.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Contact Us
        </Button>
        {submitted ? (
          <div role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-success">
            <Check aria-hidden className="size-4" />
            WhatsApp is opening with your message.
          </div>
        ) : null}
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm font-semibold text-ink-900">
            Didn&apos;t open? Copy your message and paste it into WhatsApp:
          </p>
          <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-sans text-sm text-gray-600">
            {message}
          </pre>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={copyMessage}
          >
            {copied ? (
              <>
                <Check aria-hidden className="size-4" />
                Copied
              </>
            ) : (
              <>
                <Copy aria-hidden className="size-4" />
                Copy message
              </>
            )}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
