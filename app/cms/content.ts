import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { defaultSiteContent } from "./default-content";
import type { HomeContent, SiteContent } from "./types";

const contentFilePath = path.join(process.cwd(), "content", "site-content.json");

type PartialSiteContent = Partial<SiteContent> & {
  home?: Partial<HomeContent>;
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

function normalizePhoneForHref(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("90")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `9${digits}`;
  }

  return `90${digits}`;
}

function normalizeSiteContent(content: PartialSiteContent): SiteContent {
  const contact = {
    ...defaultSiteContent.contact,
    ...content.contact
  };
  const normalizedPhone = normalizePhoneForHref(contact.phone);

  return {
    ...defaultSiteContent,
    ...content,
    siteUrl: content.siteUrl?.trim() || defaultSiteContent.siteUrl,
    contact: {
      ...contact,
      emailHref: contact.emailHref?.trim() || `mailto:${contact.email}`,
      phoneHref: contact.phoneHref?.trim() || (normalizedPhone ? `tel:+${normalizedPhone}` : ""),
      whatsappHref:
        contact.whatsappHref?.trim() || (normalizedPhone ? `https://wa.me/${normalizedPhone}` : "")
    },
    navItems: content.navItems?.length ? content.navItems : clone(defaultSiteContent.navItems),
    footerColumns: content.footerColumns?.length
      ? content.footerColumns
      : clone(defaultSiteContent.footerColumns),
    socialLinks: content.socialLinks?.length
      ? content.socialLinks
      : clone(defaultSiteContent.socialLinks),
    detailPages: content.detailPages?.length
      ? content.detailPages
      : clone(defaultSiteContent.detailPages),
    home: {
      ...defaultSiteContent.home,
      ...content.home,
      hero: {
        ...defaultSiteContent.home.hero,
        ...content.home?.hero,
        images: content.home?.hero?.images?.length
          ? content.home.hero.images
          : clone(defaultSiteContent.home.hero.images)
      },
      about: {
        ...defaultSiteContent.home.about,
        ...content.home?.about,
        bullets: content.home?.about?.bullets?.length
          ? content.home.about.bullets
          : clone(defaultSiteContent.home.about.bullets)
      },
      programIntro: {
        ...defaultSiteContent.home.programIntro,
        ...content.home?.programIntro
      },
      strengths: content.home?.strengths?.length
        ? content.home.strengths
        : clone(defaultSiteContent.home.strengths),
      programs: content.home?.programs?.length
        ? content.home.programs
        : clone(defaultSiteContent.home.programs),
      success: {
        ...defaultSiteContent.home.success,
        ...content.home?.success,
        stats: content.home?.success?.stats?.length
          ? content.home.success.stats
          : clone(defaultSiteContent.home.success.stats)
      },
      campus: {
        ...defaultSiteContent.home.campus,
        ...content.home?.campus,
        images: content.home?.campus?.images?.length
          ? content.home.campus.images
          : clone(defaultSiteContent.home.campus.images)
      },
      admission: {
        ...defaultSiteContent.home.admission,
        ...content.home?.admission,
        processItems: content.home?.admission?.processItems?.length
          ? content.home.admission.processItems
          : clone(defaultSiteContent.home.admission.processItems)
      }
    }
  };
}

export const getSiteContent = cache(async function getSiteContent() {
  try {
    const file = await readFile(contentFilePath, "utf8");
    return normalizeSiteContent(JSON.parse(file) as PartialSiteContent);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return normalizeSiteContent(defaultSiteContent);
    }

    throw error;
  }
});

export async function saveSiteContent(content: SiteContent) {
  const normalizedContent = normalizeSiteContent(content);

  await mkdir(path.dirname(contentFilePath), { recursive: true });
  await writeFile(contentFilePath, `${JSON.stringify(normalizedContent, null, 2)}\n`, "utf8");

  return normalizedContent;
}

export function getDetailPageFromContent(content: SiteContent, slug: string) {
  return content.detailPages.find((page) => page.slug === slug);
}
