"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { BookOpenCheck, Home, Phone, School } from "lucide-react";
import type { ContactInfo } from "./cms/types";
import { WhatsAppIcon } from "./whatsapp-icon";

type TabIcon = LucideIcon | ComponentType<{ size?: number }>;

type MobileTab = {
  href: string;
  text: string;
  icon: TabIcon;
  external?: boolean;
  whatsapp?: boolean;
};

type MobileTabBarProps = {
  contact: Pick<ContactInfo, "phoneHref" | "whatsappHref">;
};

export function MobileTabBar({ contact }: MobileTabBarProps) {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const tabs: MobileTab[] = [
    { href: contact.phoneHref, text: "Ara", icon: Phone, external: true },
    { href: "/akademik", text: "Akademik", icon: BookOpenCheck },
    { href: "/", text: "Ana Sayfa", icon: Home },
    { href: "/kayit", text: "Kayıt", icon: School },
    {
      href: contact.whatsappHref,
      text: "WhatsApp",
      icon: WhatsAppIcon,
      external: true,
      whatsapp: true
    }
  ];

  useEffect(() => {
    let frame = 0;

    const updateCompactState = () => {
      frame = 0;
      setIsCompact(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateCompactState);
    };

    updateCompactState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={`mobileTabBar ${isCompact ? "isCompact" : ""}`.trim()}
      aria-label="Mobil hızlı menü"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = !tab.external && pathname === tab.href;
        const whatsapp = Boolean(tab.whatsapp);
        const className = `${active ? "isActive" : ""} ${whatsapp ? "isWhatsapp" : ""}`.trim();
        const content = (
          <>
            <Icon aria-hidden="true" size={23} />
            <span>{tab.text}</span>
          </>
        );

        if (tab.external) {
          return (
            <a
              aria-label={tab.text}
              className={className}
              href={tab.href}
              key={tab.text}
              rel={whatsapp ? "noopener noreferrer" : undefined}
              target={whatsapp ? "_blank" : undefined}
            >
              {content}
            </a>
          );
        }

        return (
          <Link aria-label={tab.text} className={className} href={tab.href} key={tab.text}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
