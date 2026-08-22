import { site } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

const socialMeta = {
  GitHub: { Icon: SiGithub, color: "#E6EDF3" },
  LinkedIn: { Icon: FaLinkedinIn, color: "#0A66C2" },
  WhatsApp: { Icon: SiWhatsapp, color: "#25D366" },
  "waxdocllc.com": { Icon: TbWorld, color: "#7aa2f7" },
} as const;

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 pb-16 sm:px-10 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            index="04"
            label="Contact"
            title="Let's build something."
          />
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <FadeIn delay={60}>
            <p className="max-w-md text-lg leading-relaxed text-muted">
              Brief me on the problem. I&apos;ll tell you straight if I&apos;m
              the right person to solve it.
            </p>

            <a
              href={`https://mail.google.com/mail/?view=cm&to=${site.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex max-w-full break-all font-serif text-xl italic text-foreground transition-opacity hover:opacity-70 sm:break-normal sm:text-3xl"
            >
              {site.email}
            </a>

            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted">
              {site.location}
            </p>

            <ul className="mt-10 flex flex-wrap items-center gap-3">
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
                      className="group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 ring-1 ring-white/10 transition-colors hover:ring-white/30"
                    >
                      <span style={{ color }}>
                        <Icon size={16} aria-hidden />
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-foreground">
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
