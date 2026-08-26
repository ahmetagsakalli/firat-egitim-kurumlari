import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const routeFilePath = path.join(process.cwd(), "content", "site-content.json");
const reservedSegments = new Set(["admin", "robots.txt", "sitemap.xml", "favicon.ico"]);

type RouteIndex = {
  detailPages?: Array<{ slug?: string }>;
};

async function hasPublishedSlug(slug: string) {
  try {
    const routeIndex = JSON.parse(await readFile(routeFilePath, "utf8")) as RouteIndex;
    return routeIndex.detailPages?.some((page) => page.slug === slug) ?? false;
  } catch {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice(1);

  if (reservedSegments.has(slug) || (await hasPublishedSlug(slug))) {
    return NextResponse.next();
  }

  const notFoundUrl = request.nextUrl.clone();
  notFoundUrl.pathname = "/__not-found/invalid";

  // TLS terminates at nginx. Next.js receives the public HTTPS protocol via
  // X-Forwarded-Proto, but its internal listener is plain HTTP.
  if (notFoundUrl.hostname === "localhost" || notFoundUrl.hostname === "127.0.0.1") {
    notFoundUrl.protocol = "http:";
  }

  return NextResponse.rewrite(notFoundUrl, { status: 404 });
}

export const config = {
  matcher: ["/:slug"]
};
