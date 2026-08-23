"use client";

import { useState, type FormEvent } from "react";

const projectTypes = [
  "Landing Pages",
  "Ecommerce Websites",
  "Website Redesign",
  "CMS & Admin Systems",
  "Integrations",
  "Care & Fixes",
  "AI Chatbots",
  "WordPress",
  "Other",
] as const;

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

const labelClass =
  "mb-2 block text-[10px] font-medium tracking-[0.22em] text-muted uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState<string>(projectTypes[0]);
  const [otherProject, setOtherProject] = useState("");
  const [message, setMessage] = useState("");

  const isOther = project === "Other";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    if (isOther && otherProject.trim().length < 2) {
      setStatus("error");
      setError("Please describe your project type.");
      return;
    }

    const projectValue = isOther ? otherProject.trim() : project;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          project: projectValue,
          message,
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Could not send message.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setProject(projectTypes[0]);
      setOtherProject("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
          Sent
        </p>
        <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          Brief received.
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          I&apos;ll read it and get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[11px] tracking-[0.18em] text-accent uppercase transition-opacity hover:opacity-70"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-project" className={labelClass}>
          Project type
        </label>
        <select
          id="contact-project"
          name="project"
          value={project}
          onChange={(e) => {
            setProject(e.target.value);
            if (e.target.value !== "Other") setOtherProject("");
          }}
          className={`${fieldClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239b9ea6' stroke-width='1.5'/%3E%3C/svg%3E")`,
          }}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {isOther && (
        <div>
          <label htmlFor="contact-other-project" className={labelClass}>
            Tell me what you need
          </label>
          <input
            id="contact-other-project"
            name="otherProject"
            type="text"
            required
            value={otherProject}
            onChange={(e) => setOtherProject(e.target.value)}
            className={fieldClass}
            placeholder="e.g. Mobile app, branding site…"
          />
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} min-h-[120px] resize-y`}
          placeholder="What are you building?"
        />
      </div>

      {status === "error" && error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send brief"}
      </button>
    </form>
  );
}
