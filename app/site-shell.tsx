import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { MobileTabBar } from "./mobile-tab-bar";
import { getSiteContent } from "./cms/content";
import type { SocialPlatform } from "./cms/types";
import { WhatsAppIcon } from "./whatsapp-icon";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "facebook") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path
          d="M14.15 8.7h2.05V5.35a26.1 26.1 0 0 0-2.98-.16c-2.95 0-4.97 1.8-4.97 5.08v2.83H4.9v3.76h3.35V24h4.02v-7.14h3.14l.5-3.76h-3.64v-2.46c0-1.08.3-1.94 1.88-1.94Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <rect
          fill="none"
          height="16.5"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
          width="16.5"
          x="3.75"
          y="3.75"
        />
        <circle cx="12" cy="12" fill="none" r="3.85" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.05" cy="6.95" fill="currentColor" r="1.25" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        d="M22.55 7.14a3.02 3.02 0 0 0-2.12-2.14C18.56 4.5 12 4.5 12 4.5s-6.56 0-8.43.5a3.02 3.02 0 0 0-2.12 2.14C.95 9.03.95 12.96.95 12.96s0 3.93.5 5.82a3.02 3.02 0 0 0 2.12 2.14c1.87.5 8.43.5 8.43.5s6.56 0 8.43-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.89.5-5.82.5-5.82s0-3.93-.5-5.82ZM9.8 16.5v-7.1l5.78 3.55L9.8 16.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export async function SiteHeader() {
  const { navItems } = await getSiteContent();

  return (
    <header className="siteHeader" aria-label="Ana menü">
      <div className="headerInner">
        <Link className="brand" href="/" aria-label="Fırat Eğitim Kurumları ana sayfa">
          <Image
            className="brandLogo"
            src="/images/firat-ek-logo.webp"
            alt="Fırat Eğitim Kurumları"
            width={472}
            height={605}
            sizes="(max-width: 900px) 64px, 84px"
            loading="eager"
            preload
          />
        </Link>

        <nav className="desktopNav" aria-label="Site menüsü">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.text}
            </Link>
          ))}
        </nav>

        <Link className="headerButton" href="/kayit">
          İletişim
        </Link>
      </div>
    </header>
  );
}

export async function SiteFooter() {
  const { contact, footerColumns, socialLinks } = await getSiteContent();

  return (
    <>
      <footer className="footer">
        <div className="container footerTop">
          {footerColumns.map((column, index) => (
            <nav
              aria-label={`Footer bağlantıları ${index + 1}`}
              className="footerColumn"
              key={index}
            >
              {column.map((item) => (
                <Link href={item.href} key={item.text}>
                  <ChevronRight aria-hidden="true" size={16} />
                  <span>{item.text}</span>
                </Link>
              ))}
            </nav>
          ))}

          <div className="footerContact">
            <h2>İletişim</h2>
            <address>
              <p>{contact.address}</p>
              <a href={contact.phoneHref}>Telefon: {contact.phone}</a>
              <a href={contact.emailHref}>E-posta: {contact.email}</a>
            </address>

            <h2>Bizi Takip Edin</h2>
            <div className="socialLinks">
              {socialLinks.map((item) => (
                <a href={item.href} aria-label={item.label} key={item.label}>
                  <SocialIcon platform={item.platform} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="container footerBottomInner">
            <p>© Copyright 2026, Fırat Eğitim Kurumları. Tüm hakları saklıdır.</p>
            <p>
              Web tasarım uygulama ve geliştirme:{" "}
              <a href="https://kocyigityazilim.com" rel="noopener noreferrer" target="_blank">
                kocyigityazilim.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      <div className="floatingActions" aria-label="Hızlı iletişim">
        <a className="floatingAction phoneAction" href={contact.phoneHref} aria-label="Telefonla ara">
          <Phone aria-hidden="true" size={28} />
        </a>
        <a
          className="floatingAction whatsappAction"
          href={contact.whatsappHref}
          aria-label="WhatsApp ile yaz"
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppIcon size={31} />
        </a>
      </div>

      <MobileTabBar contact={contact} />
    </>
  );
}
