import { site } from "@/data/portfolio";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="04" title="Contact" />
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
            Brief me on the problem. I&apos;ll tell you straight if I&apos;m the
            right person to solve it.
          </p>

          <a
            href={`https://mail.google.com/mail/?view=cm&to=${site.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex border-b border-accent pb-1 font-display text-2xl text-accent transition-opacity hover:opacity-70 sm:text-3xl"
          >
            {site.email}
          </a>

          <ul className="mt-12 flex flex-wrap gap-8">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
