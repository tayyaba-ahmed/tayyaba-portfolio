import { site } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub, SiWhatsapp } from "react-icons/si";

const socialMeta = {
  GitHub: { Icon: SiGithub, color: "#E6EDF3" },
  LinkedIn: { Icon: FaLinkedinIn, color: "#0A66C2" },
  WhatsApp: { Icon: SiWhatsapp, color: "#25D366" },
} as const;

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading index="04" title="Contact" />
        </FadeIn>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <FadeIn delay={60}>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Brief me on the problem. I&apos;ll tell you straight if I&apos;m
              the right person to solve it.
            </p>

            <a
              href={`https://mail.google.com/mail/?view=cm&to=${site.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex border-b border-accent pb-1 font-display text-2xl text-accent transition-opacity hover:opacity-70 sm:text-3xl"
            >
              {site.email}
            </a>

            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {site.location}
            </p>

            <ul className="mt-10 flex flex-wrap items-center gap-4">
              {site.socials.map((social) => {
                const meta =
                  socialMeta[social.label as keyof typeof socialMeta];
                if (!meta) return null;
                const { Icon, color } = meta;

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group inline-flex items-center gap-2.5 border border-border px-4 py-3 transition-colors hover:border-accent/50"
                    >
                      <span style={{ color }}>
                        <Icon size={18} aria-hidden />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-foreground">
                        {social.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn delay={120}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
