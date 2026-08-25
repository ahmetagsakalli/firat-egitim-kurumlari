import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "./scroll-to-top";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://firat-egitim-kurumlari.vercel.app";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fırat Eğitim Kurumları | Anaokulundan Liseye Güvenli Kampüs",
    template: "%s | Fırat Eğitim Kurumları"
  },
  applicationName: "Fırat Eğitim Kurumları",
  authors: [{ name: "Fırat Eğitim Kurumları" }],
  creator: "Fırat Eğitim Kurumları",
  publisher: "Fırat Eğitim Kurumları",
  icons: {
    icon: [{ url: "/images/firat-logo.png", type: "image/png" }],
    apple: [{ url: "/images/firat-logo.png", type: "image/png" }]
  },
  keywords: [
    "Fırat Eğitim Kurumları",
    "Fırat Koleji",
    "özel okul",
    "anaokulu",
    "ilkokul",
    "ortaokul",
    "lise",
    "YKS hazırlık",
    "kampüs"
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08152f",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={sans.variable} data-scroll-behavior="smooth">
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
