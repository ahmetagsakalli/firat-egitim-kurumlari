import {
  contact,
  detailPages,
  footerColumns,
  navItems,
  siteUrl,
  socialLinks
} from "../site-data";
import type { HomeContent, SiteContent } from "./types";

const clone = <T,>(value: unknown): T => JSON.parse(JSON.stringify(value)) as T;

export const defaultHomeContent: HomeContent = {
  hero: {
    title: "Güçlü Nesiller",
    accent: "Güçlü Gelecek",
    text: "Anaokulundan liseye uzanan eğitim yolculuğunda akademik başarıyı, güvenli kampüs yaşamını ve değerler eğitimini aynı çatı altında buluşturuyoruz.",
    ctaText: "Kayıt Görüşmesi Planla",
    ctaHref: "/kayit",
    images: [
      {
        src: "/images/firat-classroom.webp",
        alt: "Fırat Eğitim Kurumları sınıf ortamı",
        className: "tileRound"
      },
      {
        src: "/images/firat-sports.webp",
        alt: "Fırat Eğitim Kurumları spor alanı",
        className: "tileSoft"
      },
      {
        src: "/images/firat-reading.webp",
        alt: "Fırat Eğitim Kurumları açık hava etkinliği",
        className: "tileSoft"
      },
      {
        src: "/images/firat-building.webp",
        alt: "Fırat Eğitim Kurumları okul binası",
        className: "tileLeaf"
      }
    ]
  },
  strengths: [
    {
      value: "1987",
      title: "Köklü Deneyim",
      text: "Kendini yenileyen okul kültürü"
    },
    {
      value: "Bütüncül",
      title: "Eğitim Modeli",
      text: "Akademik ve sosyal gelişim"
    },
    {
      value: "Yakın",
      title: "Öğrenci Takibi",
      text: "Rehberlik ve veli iletişimi"
    },
    {
      value: "Güvenli",
      title: "Kampüs Yaşamı",
      text: "Düzenli ve kontrollü alanlar"
    }
  ],
  about: {
    title: "Fırat'ta eğitim, öğrenciyi tanımakla başlar.",
    text: "1987'den bu yana anaokulu, ilkokul, ortaokul ve Anadolu Lisesi kademelerinde öğrencinin akademik gelişimi, sosyal uyumu ve hedefleri birlikte takip edilir.",
    bullets: [
      "Sıcak bir aile ortamı",
      "15 kişilik özel sınıflar",
      "Çağdaş ve modern eğitim anlayışı"
    ],
    image: "/images/firat-reception.webp",
    imageAlt: "Fırat Koleji giriş ve karşılama alanı"
  },
  programIntro: {
    title: "Akademik Programlar",
    text: "Her bölüm, yaş grubunun ihtiyacına göre yapılandırılır; rehberlik, atölye ve sosyal gelişim çalışmalarıyla desteklenir."
  },
  programs: [
    {
      title: "Anaokulu",
      text: "Sevgi temelli başlangıç, oyun, sanat ve yabancı dil desteği.",
      image: "/images/firat-kindergarten.webp"
    },
    {
      title: "İlkokul",
      text: "Okuma, yazma, arkadaşlık ve kişisel sorumluluk becerileri.",
      image: "/images/firat-classroom.webp"
    },
    {
      title: "Ortaokul",
      text: "Akıllı tahta uygulamalarıyla desteklenen disiplinli çalışma.",
      image: "/images/firat-reading.webp"
    },
    {
      title: "Anadolu Lisesi",
      text: "YKS hedefi, meslek yönelimi ve bireysel rehberlik.",
      image: "/images/classroom-smartboard.webp"
    }
  ],
  success: {
    title: "Başarı, düzenli takip ve doğru hedefle gelir.",
    text: "2026 YKS'de sınava giren 164 öğrencimizden alınan dereceler, planlı takip ve hedef odaklı lise programının güçlü çıktıları arasında yer alıyor.",
    image: "/images/firat-yks-success.webp",
    imageAlt: "Fırat Koleji tam isabet başarı görseli",
    stats: [
      { value: "7", text: "ilk binde derece" },
      { value: "16", text: "ilk 5 binde derece" },
      { value: "26", text: "ilk 10 binde derece" }
    ]
  },
  campus: {
    title: "Kampüs Yaşamı",
    text: "Derslikler, açık alanlar, spor sahası ve sosyal etkinlikler öğrencinin okul deneyimini bütünler.",
    images: [
      {
        src: "/images/firat-reading.webp",
        alt: "Fırat Eğitim Kurumları açık hava etkinliği"
      },
      {
        src: "/images/firat-ceremony.webp",
        alt: "Fırat Eğitim Kurumları tören ve etkinlikleri"
      }
    ]
  },
  admission: {
    title: "2026-2027 kayıt görüşmeleri başladı.",
    text: "Çocuğunuzun eğitim yolculuğunu birlikte planlayalım. Kampüs gezisi, seviye görüşmesi ve kontenjan bilgisi için bize ulaşın.",
    processItems: [
      "Öğrenci seviyesi ve veli beklentisi birlikte değerlendirilir.",
      "Kampüs, sınıf, bahçe ve sosyal alanlar yerinde gezilir.",
      "Kontenjan ve kayıt süreci net şekilde paylaşılır."
    ]
  }
};

export const defaultSiteContent: SiteContent = {
  siteUrl,
  contact: clone<SiteContent["contact"]>(contact),
  navItems: clone<SiteContent["navItems"]>(navItems),
  footerColumns: clone<SiteContent["footerColumns"]>(footerColumns),
  socialLinks: clone<SiteContent["socialLinks"]>(socialLinks),
  detailPages: clone<SiteContent["detailPages"]>(detailPages),
  home: defaultHomeContent
};
