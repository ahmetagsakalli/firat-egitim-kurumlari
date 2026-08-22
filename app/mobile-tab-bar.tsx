"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { BookOpenCheck, Home, MessageCircle, Phone, School } from "lucide-react";
import type { ContactInfo } from "./cms/types";

type MobileTab = {
  href: string;
  text: string;
  icon: LucideIcon;
  external?: boolean;
  whatsapp?: boolean;
};

type MobileTabBarProps = {
  contact: Pick<ContactInfo, "phoneHref" | "whatsappHref">;
};

export function MobileTabBar({ contact }: MobileTabBarProps) {
  const pathname = usePathname();
  const tabs: MobileTab[] = [
    { href: contact.phoneHref, text: "Ara", icon: Phone, external: true },
    { href: "/akademik", text: "Akademik", icon: BookOpenCheck },
    { href: "/", text: "Ana Sayfa", icon: Home },
    { href: "/kayit", text: "Kayıt", icon: School },
    {
      href: contact.whatsappHref,
      text: "WhatsApp",
      icon: MessageCircle,
      external: true,
      whatsapp: true
    }
  ];

  return (
    <nav className="mobileTabBar" aria-label="Mobil hızlı menü">
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
