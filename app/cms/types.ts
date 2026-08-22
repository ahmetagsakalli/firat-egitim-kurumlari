export type NavItem = {
  href: string;
  text: string;
};

export type ContactInfo = {
  address: string;
  email: string;
  emailHref: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
};

export type SocialPlatform = "facebook" | "instagram" | "youtube";

export type SocialLink = {
  href: string;
  label: string;
  platform: SocialPlatform;
};

export type DetailSection = {
  title: string;
  text: string;
  items?: string[];
};

export type StatItem = {
  value: string;
  text: string;
};

export type DetailPage = {
  slug: string;
  navText: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  summary: string;
  sections: DetailSection[];
  highlights?: string[];
  stats?: StatItem[];
};

export type HeroImage = {
  src: string;
  alt: string;
  className: string;
};

export type StrengthItem = {
  value: string;
  title: string;
  text: string;
};

export type ProgramItem = {
  title: string;
  text: string;
  image: string;
};

export type HomeImage = {
  src: string;
  alt: string;
};

export type HomeContent = {
  hero: {
    title: string;
    accent: string;
    text: string;
    ctaText: string;
    ctaHref: string;
    images: HeroImage[];
  };
  strengths: StrengthItem[];
  about: {
    title: string;
    text: string;
    bullets: string[];
    image: string;
    imageAlt: string;
  };
  programIntro: {
    title: string;
    text: string;
  };
  programs: ProgramItem[];
  success: {
    title: string;
    text: string;
    image: string;
    imageAlt: string;
    stats: StatItem[];
  };
  campus: {
    title: string;
    text: string;
    images: HomeImage[];
  };
  admission: {
    title: string;
    text: string;
    processItems: string[];
  };
};

export type SiteContent = {
  siteUrl: string;
  contact: ContactInfo;
  navItems: NavItem[];
  footerColumns: NavItem[][];
  socialLinks: SocialLink[];
  detailPages: DetailPage[];
  home: HomeContent;
};
