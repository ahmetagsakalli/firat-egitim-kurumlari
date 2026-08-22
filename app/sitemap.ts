import type { MetadataRoute } from "next";
import { getSiteContent } from "./cms/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { detailPages, siteUrl } = await getSiteContent();
  const lastModified = new Date("2026-08-16");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    ...detailPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page.slug === "kayit" ? 0.9 : 0.8
    }))
  ];
}
