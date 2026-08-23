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
    <section id="contact" className="scroll-mt-24 px-5 pb-16 sm:px-10 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeading
            index="04"
            label="Contact"
            title="Start a project."
          />
        </FadeIn>

        <div className="mt-10 md:mt-12 md:grid md:grid-cols-2 md:items-start md:gap-10 lg:gap-14">
          <FadeIn delay={60}>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-muted">
                Pick a channel or send a brief below. I reply within 24 hours.
              </p>

              <div className="mt-8">
                <p className="mb-2 text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                  Email
                </p>
                <a
                  href={`https://mail.google.com/mail/?view=cm&to=${site.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full break-all font-serif text-xl italic text-foreground transition-opacity hover:opacity-70 sm:break-normal sm:text-3xl"
                >
                  {site.email}
                </a>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-[10px] font-medium tracking-[0.22em] text-muted uppercase">
                  Phone
                </p>
                <a
                  href={site.phoneHref}
                  className="block font-serif text-lg italic text-foreground transition-opacity hover:opacity-70 sm:text-xl"
                >
                  {site.phone}
                </a>
              </div>

              <p className="mt-4 text-[11px] tracking-[0.22em] text-muted uppercase">
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
                        <span className="text-[11px] tracking-[0.2em] text-muted uppercase transition-colors group-hover:text-foreground">
                          {social.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="mt-12 rounded-2xl border border-accent/45 bg-black/20 p-6 sm:p-8 md:mt-0">
              <p className="mb-6 font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                Project brief
              </p>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
