"use client";

import { useState, type FormEvent } from "react";

const projectTypes = [
  "Website / Landing page",
  "Ecommerce",
  "Redesign",
  "CMS / Admin",
  "Integration",
  "Something else",
] as const;

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full border border-border bg-surface/50 px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

const labelClass =
  "mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState<string>(projectTypes[0]);
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, message }),
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
      setMessage("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[280px] flex-col justify-center border border-border bg-surface/40 p-8 sm:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Sent
        </p>
        <p className="mt-4 font-display text-3xl font-medium tracking-tight text-foreground">
          Message received.
        </p>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">
          I&apos;ll read it and get back to you. If it&apos;s urgent, email me
          directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex w-fit border border-border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-border bg-surface/40 p-6 sm:p-8" noValidate>
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

      <div className="mt-5">
        <label htmlFor="contact-project" className={labelClass}>
          Project type
        </label>
        <select
          id="contact-project"
          name="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className={`${fieldClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239a8f82' stroke-width='1.5'/%3E%3C/svg%3E")`,
          }}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y min-h-[140px]`}
          placeholder="What are you building, and what do you need from me?"
        />
      </div>

      {status === "error" && error && (
        <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-red-300/90" role="alert">
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center bg-accent px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Usually replies within 24h
        </p>
      </div>
    </form>
  );
}
