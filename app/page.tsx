import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Target,
  UsersRound
} from "lucide-react";
import { getSiteContent } from "./cms/content";
import { resolveImageSrc } from "./cms/image-src";
import { HeroTypewriter } from "./hero-typewriter";
import { SiteFooter, SiteHeader } from "./site-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Fırat Eğitim Kurumları | Anaokulundan Liseye Güvenli Kampüs"
  },
  description:
    "Fırat Eğitim Kurumları olarak okul öncesinden liseye güvenli kampüs, akademik takip, sosyal gelişim ve YKS hedeflerini birlikte destekleyen eğitim yaklaşımı sunuyoruz.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Fırat Eğitim Kurumları",
    title: "Fırat Eğitim Kurumları",
    description:
      "Anaokulundan liseye güvenli kampüs, güçlü akademik takip ve öğrenciyi merkeze alan eğitim.",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Fırat Eğitim Kurumları kampüs yaşamı"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fırat Eğitim Kurumları",
    description:
      "Anaokulundan liseye güvenli kampüs, güçlü akademik takip ve öğrenciyi merkeze alan eğitim.",
    images: ["/images/og-image.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const strengthIcons = [Award, BookOpenCheck, UsersRound, ShieldCheck];
const programIcons = [School, BookOpenCheck, Target, GraduationCap];
const defaultHeroTypewriterWords = ["Mutlu", "Öncü", "Özgür", "Cesur"];

function hasImage(src?: string) {
  return Boolean(src?.trim());
}

export default async function Home() {
  const content = await getSiteContent();
  const { contact, home, siteUrl } = content;
  const heroImages = home.hero.images.filter((image) => hasImage(image.src));
  const campusImages = home.campus.images.filter((image) => hasImage(image.src));
  const [heroAccentWord = "Güçlü", ...heroAccentSuffixParts] = home.hero.accent.trim().split(/\s+/);
  const heroAccentSuffix = heroAccentSuffixParts.join(" ") || "Gelecek";
  const heroTypewriterWords = [
    heroAccentWord,
    ...defaultHeroTypewriterWords.filter((word) => word !== heroAccentWord)
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Fırat Eğitim Kurumları",
    alternateName: "Fırat Koleji",
    url: siteUrl,
    logo: `${siteUrl}/images/firat-ek-logo.webp`,
    image: `${siteUrl}/images/og-image.webp`,
    description:
      "Fırat Eğitim Kurumları olarak okul öncesinden liseye güvenli kampüs, akademik takip ve öğrenciyi merkeze alan eğitim yaklaşımı sunuyoruz.",
    areaServed: "Türkiye",
    availableLanguage: "tr"
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
        <section className="hero" aria-labelledby="hero-title">
          <div className="container heroInner">
            <div className="heroCopy">
              <h1 id="hero-title">
                {home.hero.title}{" "}
                <span className="heroAccent">
                  <HeroTypewriter suffix={heroAccentSuffix} words={heroTypewriterWords} />
                </span>
              </h1>
              <p>{home.hero.text}</p>
              <Link className="primaryButton" href={home.hero.ctaHref}>
                {home.hero.ctaText}
              </Link>
            </div>

            {heroImages.length ? (
              <div className="heroVisual" aria-label="Fırat Eğitim Kurumları kampüs görselleri">
                {heroImages.map((image, index) => (
                  <div className={`visualTile ${image.className}`} key={image.alt}>
                    <Image
                      src={resolveImageSrc(image.src)}
                      alt={image.alt}
                      width={480}
                      height={430}
                      sizes="(max-width: 900px) 44vw, 22vw"
                      loading="eager"
                      preload={index === 0}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="strengthSection" aria-label="Fırat Eğitim Kurumları öne çıkanlar">
          <div className="container strengthGrid">
            {home.strengths.map((item, index) => {
              const Icon = strengthIcons[index] ?? Award;
              return (
                <article className="strengthCard" key={item.title}>
                  <span>
                    <Icon aria-hidden="true" size={30} />
                  </span>
                  <strong>{item.value}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="aboutSection" id="hakkimizda">
          <div className="container twoColumn">
            <div className="sectionCopy">
              <h2>{home.about.title}</h2>
              <p>{home.about.text}</p>
              <ul className="checkList">
                {home.about.bullets.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {hasImage(home.about.image) ? (
              <div className="aboutImage">
                <Image
                  src={resolveImageSrc(home.about.image)}
                  alt={home.about.imageAlt}
                  width={1200}
                  height={760}
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            ) : null}
          </div>
        </section>

        <section className="programSection" id="akademik">
          <div className="container">
            <div className="sectionHeading">
              <h2>{home.programIntro.title}</h2>
              <p>{home.programIntro.text}</p>
            </div>

            <div className="programGrid">
              {home.programs.map((program, index) => {
                const Icon = programIcons[index] ?? School;
                return (
                  <article className="programCard" key={program.title}>
                    {hasImage(program.image) ? (
                      <div className="programImage">
                        <Image
                          src={resolveImageSrc(program.image)}
                          alt={`${program.title} eğitim ortamı`}
                          width={700}
                          height={520}
                          sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 25vw"
                        />
                      </div>
                    ) : null}
                    <div className="programBody">
                      <span className="iconBox">
                        <Icon aria-hidden="true" size={22} />
                      </span>
                      <h3>{program.title}</h3>
                      <p>{program.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="successSection" id="basari">
          <div className="container successPanel">
            {hasImage(home.success.image) ? (
              <div className="successImage">
                <Image
                  src={resolveImageSrc(home.success.image)}
                  alt={home.success.imageAlt}
                  width={920}
                  height={640}
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
            ) : null}
            <div className="sectionCopy">
              <h2>{home.success.title}</h2>
              <p>{home.success.text}</p>
              <div className="successNumbers">
                {home.success.stats.map((item) => (
                  <div key={item.text}>
                    <strong>{item.value}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="campusSection" id="kampus">
          <div className="container">
            <div className="sectionHeading">
              <h2>{home.campus.title}</h2>
              <p>{home.campus.text}</p>
            </div>

            <div className="campusGrid">
              {campusImages.map((image, index) => (
                <Image
                  alt={image.alt}
                  height={index === 0 ? 740 : 680}
                  key={image.src}
                  sizes={index === 0 ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 36vw"}
                  src={resolveImageSrc(image.src)}
                  width={index === 0 ? 1180 : 900}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="admissionSection" id="kayit">
          <div className="container">
            <div className="admissionPanel">
              <div>
                <h2>{home.admission.title}</h2>
                <p>{home.admission.text}</p>
              </div>
              <div className="processList">
                {home.admission.processItems.map((item) => (
                  <div key={item}>
                    <CalendarCheck aria-hidden="true" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="admissionActions">
                <a href={contact.phoneHref}>
                  <Phone aria-hidden="true" size={20} />
                  {contact.phone}
                </a>
                <a href={contact.emailHref}>
                  <Mail aria-hidden="true" size={20} />
                  {contact.email}
                </a>
                <Link href="/kampus">
                  <MapPin aria-hidden="true" size={20} />
                  Kampüsü İncele
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
