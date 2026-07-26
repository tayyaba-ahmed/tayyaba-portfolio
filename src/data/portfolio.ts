export type Skill = {
  name: string;
  icon: string;
};

export type Service = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  github?: string;
  image?: string;
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
  email: "tayyabaahmed777@gmail.com",
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
    },
    {
      title: "Ecommerce Websites",
      description:
        "Full online stores — catalogs, carts, checkout, and payments ready to sell.",
    },
    {
      title: "Website Redesign",
      description:
        "Outdated sites rebuilt with clearer structure, stronger visuals, and better conversion.",
    },
    {
      title: "CMS & Admin Systems",
      description:
        "Custom CMS and admin tools so your team can edit content and manage data without a developer.",
    },
    {
      title: "Integrations",
      description:
        "Payment flows, AI chatbots, and third-party APIs wired cleanly into your product.",
    },
    {
      title: "Care & Fixes",
      description:
        "Bugs squashed, speed recovered, and sites kept reliable after launch.",
    },
  ] satisfies Service[],
  projects: [
    {
      title: "StrideWear",
      description:
        "Fashion e-commerce with curated collections, category shopping, and a clean storefront built for everyday elegance.",
      tags: ["Next.js", "E-commerce", "UI"],
      href: "https://stridewear.vercel.app/",
      image: "stridewear",
    },
    {
      title: "ZAS Architects & Interiors",
      description:
        "Architecture and interiors studio site — services, portfolio energy, and a dark cinematic presence for a design firm.",
      tags: ["Next.js", "Architecture", "Branding"],
      href: "https://www.zasarchitectsinteriors.com/",
      image: "zas",
    },
    {
      title: "Personal Portfolio",
      description:
        "My own portfolio — film-toned layout, sharp type, and a living background built to show what I ship.",
      tags: ["Next.js", "Tailwind CSS", "Motion"],
      href: "https://tayyaba-ahmed-portfolio.vercel.app/",
      image: "portfolio",
    },
  ] as Project[],
  socials: [
    { label: "GitHub", href: "https://github.com/tayyaba-ahmed", icon: "SiGithub" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tayyabaahmed", icon: "SiLinkedinIn" },
    { label: "WhatsApp", href: "https://wa.me/923132115662", icon: "SiWhatsapp" },
  ] satisfies SocialLink[],
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};
