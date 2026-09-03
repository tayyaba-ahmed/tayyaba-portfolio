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
    "I create unconventional yet functional interfaces for the web.",
  email: "tayyabaahmed777@gmail.com",
  phone: "+92 313 2115662",
  phoneHref: "tel:+923132115662",
  location: "Available worldwide",
  cv: "/Tayyaba-Ahmed-CV.pdf",
  about: [
    "I take ownership from brief to production. Clean architecture, accessible UI, and decisions that age well.",
    "Less theater. More shipping. If it needs to work under pressure, I want my name on it.",
  ],
  skills: [
    { name: "PHP", icon: "SiPhp" },
    { name: "Laravel", icon: "SiLaravel" },
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "TypeScript", icon: "SiTypescript" },
    { name: "React", icon: "SiReact" },
    { name: "Next.js", icon: "SiNextdotjs" },
    { name: "Node.js", icon: "SiNodedotjs" },
    { name: "HTML5", icon: "SiHtml5" },
    { name: "CSS3", icon: "SiCss" },
    { name: "Tailwind CSS", icon: "SiTailwindcss" },
    { name: "Sass", icon: "SiSass" },
    { name: "Bootstrap", icon: "SiBootstrap" },
    { name: "C", icon: "SiC" },
    { name: "C#", icon: "TbBrandCSharp" },
    { name: "ASP.NET", icon: "SiDotnet" },
    { name: "Python", icon: "SiPython" },
    { name: "Java", icon: "SiOpenjdk" },
    { name: "MySQL", icon: "SiMysql" },
    { name: "PostgreSQL", icon: "SiPostgresql" },
    { name: "MongoDB", icon: "SiMongodb" },
    { name: "Express", icon: "SiExpress" },
    { name: "Git", icon: "SiGit" },
    { name: "Docker", icon: "SiDocker" },
    { name: "Linux", icon: "SiLinux" },
  ] satisfies Skill[],
  services: [
    {
      title: "Landing Pages",
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
        "Custom CMS and admin tools — your team edits content without a developer.",
    },
    {
      title: "Integrations",
      description:
        "Payment flows and third-party APIs wired cleanly into your product.",
    },
    {
      title: "Care & Fixes",
      description:
        "Bugs squashed, speed recovered, and sites kept reliable after launch.",
    },
    {
      title: "AI Chatbots",
      description:
        "Site and WhatsApp chatbots that answer questions, qualify leads, and hand off.",
    },
    {
      title: "WordPress",
      description:
        "Custom WordPress sites and themes — beautiful, editable, and built for your brand.",
    },
  ] satisfies Service[],
  projects: [
    {
      title: "Lumière Salon",
      description:
        "Premium WordPress theme for a luxury salon — booking, custom post types, ACF fields, and a fully editable admin experience.",
      tags: ["WordPress", "PHP", "Booking"],
      href: "https://lumiere-salon.infinityfree.io/",
      image: "lumiere",
    },
    // {
    //   title: "7 Touch Solutions",
    //   description:
    //     "Agency site with services, reviews, and an AI chatbot layer — websites, apps, and growth marketing for startups.",
    //   tags: ["HTML", "Supabase", "Chatbot"],
    //   href: "https://7touchsolutions.com/",
    //   image: "7touch",
    // },
    {
      title: "StrideWear",
      description:
        "Fashion e-commerce with curated collections, category shopping, cart, checkout, and an admin loop — built for everyday elegance.",
      tags: ["Next.js", "E-commerce", "Prisma"],
      href: "https://stridewear.vercel.app/",
      github: "https://github.com/tayyaba-ahmed/stridewear",
      image: "stridewear",
    },
    {
      title: "ZAS Architects & Interiors",
      description:
        "Architecture and interiors studio site — services, portfolio energy, and a dark cinematic presence for a design firm.",
      tags: ["Next.js", "Architecture", "Branding"],
      href: "https://www.zasarchitectsinteriors.com/",
      github: "https://github.com/tayyaba-ahmed/zas",
      image: "zas",
    },
    // {
    //   title: "WAX DOC",
    //   description:
    //     "Digital agency marketing site for custom websites, AI chatbots, calling agents, apps, and creative services.",
    //   tags: ["HTML", "Agency", "Marketing"],
    //   href: "https://waxdocllc.com/",
    //   image: "waxdoc",
    // },
  ] as Project[],
  socials: [
    { label: "GitHub", href: "https://github.com/tayyaba-ahmed", icon: "SiGithub" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tayyabaahmed", icon: "SiLinkedinIn" },
    { label: "WhatsApp", href: "https://wa.me/923132115662", icon: "SiWhatsapp" },
  ] satisfies SocialLink[],
  nav: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};
