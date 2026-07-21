export type Skill = {
  name: string;
  icon: string;
};

export type Service = {
  title: string;
  description: string;
  image: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export const site = {
  firstName: "Tayyaba",
  fullName: "Tayyaba Ahmed",
  title: "Software Developer",
  tagline:
    "I ship sharp products end to end — interfaces people trust, backends that hold.",
  email: "tayyabaahmed777@mail.com",
  location: "Available worldwide",
  about: [
    "I take ownership from brief to production. Clean architecture, accessible UI, and decisions that age well.",
    "Less theater. More shipping. If it needs to work under pressure, I want my name on it.",
  ],
  skills: [
    { name: "PHP", icon: "SiPhp" },
    { name: "Laravel", icon: "SiLaravel" },
    { name: "React", icon: "SiReact" },
    { name: "Next.js", icon: "SiNextdotjs" },
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "MySQL", icon: "SiMysql" },
    { name: "C", icon: "SiC" },
    { name: "ASP.NET", icon: "SiDotnet" },
    { name: "Tailwind CSS", icon: "SiTailwindcss" },
  ] satisfies Skill[],
  services: [
    {
      title: "Websites & Landing Pages",
      description:
        "Marketing sites, portfolios, and landing pages built to load fast and convert.",
      image: "/services/web.svg",
    },
    {
      title: "CMS & Admin Systems",
      description:
        "Custom CMS and admin tools so your team can edit content and manage data without a developer.",
      image: "/services/laravel.svg",
    },
    {
      title: "Integrations",
      description:
        "Payment flows, AI chatbots, and third-party APIs wired cleanly into your product.",
      image: "/services/api.svg",
    },
    {
      title: "Care & Fixes",
      description:
        "Bugs squashed, speed recovered, and sites kept reliable after launch.",
      image: "/services/maintenance.svg",
    },
  ] satisfies Service[],
  projects: [
    {
      title: "Project One",
      description:
        "Full-stack app with auth, live updates, and a dashboard that stays usable at speed.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      href: "https://example.com",
      github: "https://github.com",
    },
    {
      title: "Project Two",
      description:
        "Open-source CLI that kills repetitive workflow — hours back every week.",
      tags: ["Node.js", "CLI", "Open Source"],
      github: "https://github.com",
    },
    {
      title: "Project Three",
      description:
        "Mobile-first landing built for conversion, with motion that earns its place.",
      tags: ["React", "Tailwind CSS", "Motion"],
      href: "https://example.com",
    },
  ] satisfies Project[],
  socials: [
    { label: "GitHub", href: "https://github.com/tayyaba-ahmed", icon: "SiGithub" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tayyabaahmed", icon: "SiLinkedinIn" },
    { label: "WhatsApp", href: "https://wa.me/923132115662", icon: "SiWhatsapp" },
  ] satisfies SocialLink[],
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};
