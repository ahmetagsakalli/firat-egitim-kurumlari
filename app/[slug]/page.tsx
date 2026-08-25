import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getDetailPageFromContent, getSiteContent } from "../cms/content";
import { SiteFooter, SiteHeader } from "../site-shell";

const aboutSmallSectionTitles = new Set(["Vizyonumuz", "Misyonumuz", "Hedefimiz"]);
export const dynamic = "force-dynamic";
const fallbackImage = "/images/og-image.webp";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function hasImage(src?: string) {
  return Boolean(src?.trim());
}

function absoluteImageUrl(siteUrl: string, src: string) {
  return src.startsWith("http") ? src : `${siteUrl}${src}`;
}

export async function generateStaticParams() {
  const content = await getSiteContent();

  return content.detailPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const page = getDetailPageFromContent(content, slug);

  if (!page) {
    return {
      title: "Sayfa Bulunamadı"
    };
  }

  const metaImage = hasImage(page.image) ? page.image : fallbackImage;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `/${page.slug}`,
      siteName: "Fırat Eğitim Kurumları",
      title: page.title,
      description: page.description,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 760,
          alt: page.imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [metaImage]
    }
  };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getSiteContent();
  const { contact, siteUrl } = content;
  const page = getDetailPageFromContent(content, slug);

  if (!page) {
    notFound();
  }

  const isAboutPage = page.slug === "hakkimizda";
  const aboutSmallSections = isAboutPage
    ? page.sections.filter((section) => aboutSmallSectionTitles.has(section.title))
    : [];
  const aboutReasonSection = isAboutPage
    ? page.sections.find((section) => section.title === "Neden Fırat?")
    : undefined;
  const pageImage = hasImage(page.image) ? page.image : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `${siteUrl}/${page.slug}`,
    image: absoluteImageUrl(siteUrl, pageImage || fallbackImage),
    inLanguage: "tr-TR",
    isPartOf: {
      "@type": "WebSite",
      name: "Fırat Eğitim Kurumları",
      url: siteUrl
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: siteUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.navText,
          item: `${siteUrl}/${page.slug}`
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a className="skipLink" href="#icerik">
        İçeriğe geç
      </a>
      <SiteHeader />

      <main id="icerik">
        <section className="detailHero" aria-labelledby="detail-title">
          <div className="container detailHeroInner">
            <div className="detailHeroCopy">
              <nav className="breadcrumb" aria-label="Sayfa yolu">
                <Link href="/">
                  <ArrowLeft aria-hidden="true" size={17} />
                  Ana Sayfa
                </Link>
                <span>{page.navText}</span>
              </nav>
              <h1 id="detail-title">{page.title}</h1>
              <p>{page.description}</p>
            </div>

            {pageImage ? (
              <div className="detailHeroImage">
                <Image
                  src={pageImage}
                  alt={page.imageAlt}
                  width={1200}
                  height={760}
                  sizes="(max-width: 900px) 100vw, 42vw"
                  priority
                />
              </div>
            ) : null}
          </div>
        </section>

        {page.stats ? (
          <section className="detailStats" aria-label="Başarı göstergeleri">
            <div className="container detailStatGrid">
              {page.stats.map((item) => (
                <div key={item.text}>
                  <strong>{item.value}</strong>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="detailContent">
          {isAboutPage && aboutReasonSection ? (
            <div className="container aboutDetailLayout">
              <div className="aboutMiniGrid">
                {aboutSmallSections.map((section) => (
                  <article className="aboutMiniCard" key={section.title}>
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                  </article>
                ))}
              </div>

              <article className="aboutReasonCard">
                <h2>{aboutReasonSection.title}</h2>
                <p>{aboutReasonSection.text}</p>
                {aboutReasonSection.items ? (
                  <ul>
                    {aboutReasonSection.items.map((item) => (
                      <li key={item}>
                        <CheckCircle2 aria-hidden="true" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </div>
          ) : (
            <div className="container detailGrid">
              {page.sections.map((section) => (
                <article className="detailCard" key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                  {section.items ? (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 aria-hidden="true" size={20} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>

        {page.highlights ? (
          <section className="detailHighlights" aria-label="Öne çıkan başlıklar">
            <div className="container highlightGrid">
              {page.highlights.map((item) => (
                <div className="highlightItem" key={item}>
                  <CheckCircle2 aria-hidden="true" size={22} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="detailCtaSection">
          <div className="container detailCta">
            <div>
              <h2>Bizi yakından tanımak için görüşme planlayın.</h2>
              <p>Kampüs gezisi, kademe bilgisi ve kayıt süreci için bize ulaşın.</p>
            </div>
            <a className="lightButton" href={contact.phoneHref}>
              <Phone aria-hidden="true" size={20} />
              {contact.phone}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
