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

  return new NextResponse(
    `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Sayfa bulunamadı | Fırat Eğitim Kurumları</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Arial, sans-serif;
        color: #07183b;
        background: #fff;
      }
      main {
        width: min(760px, calc(100% - 40px));
        text-align: center;
      }
      h1 {
        margin: 0 0 18px;
        font-size: clamp(36px, 7vw, 64px);
        line-height: 1.05;
      }
      p {
        margin: 0 auto 26px;
        max-width: 560px;
        color: #737988;
        font-size: 18px;
        line-height: 1.7;
      }
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 54px;
        padding: 0 34px;
        border-radius: 999px;
        background: #1565c0;
        color: #fff;
        font-weight: 800;
        text-decoration: none;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Aradığınız sayfa bulunamadı.</h1>
      <p>Sayfa taşınmış olabilir. Ana sayfadan okul seviyeleri, kampüs yaşamı ve kayıt bilgilerine ulaşabilirsiniz.</p>
      <a href="/">Ana sayfaya dön</a>
    </main>
  </body>
</html>`,
    {
      status: 404,
      headers: {
        "content-type": "text/html; charset=utf-8"
      }
    }
  );
}

export const config = {
  matcher: ["/:slug"]
};
