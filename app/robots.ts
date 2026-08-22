import type { MetadataRoute } from "next";
import { getSiteContent } from "./cms/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteUrl } = await getSiteContent();

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
