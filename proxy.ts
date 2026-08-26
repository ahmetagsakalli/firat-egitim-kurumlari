import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publishedSegments = new Set([
  "hakkimizda",
  "akademik",
  "kayit",
  "kampus",
  "basari",
  "rehberlik"
]);

const reservedSegments = new Set([
  "admin",
  "api",
  "_next",
  "images",
  "uploads",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico"
]);

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice(1);

  if (publishedSegments.has(slug) || reservedSegments.has(slug)) {
    return NextResponse.next();
  }

  const notFoundUrl = request.nextUrl.clone();
  notFoundUrl.pathname = "/__not-found/invalid";

  return NextResponse.rewrite(notFoundUrl, { status: 404 });
}

export const config = {
  matcher: ["/:slug"]
};
