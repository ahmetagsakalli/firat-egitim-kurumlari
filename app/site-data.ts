export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://firat-egitim-kurumlari.vercel.app";

export const contact = {
  address:
    "Karşıyaka, Sırrın Mevkii İl Jandarma Alay Komutanlığı Arkası, 63050 Haliliye/Şanlıurfa",
  email: "info@firategitim.com",
  emailHref: "mailto:info@firategitim.com",
  phone: "0532 208 15 22",
  phoneHref: "tel:+905322081522",
  whatsappHref: "https://wa.me/905322081522"
};

export const navItems = [
  { href: "/hakkimizda", text: "Hakkımızda" },
  { href: "/akademik", text: "Akademik" },
  { href: "/kayit", text: "Kayıt" },
  { href: "/kampus", text: "Kampüs" },
  { href: "/basari", text: "Başarı" }
] as const;

export const footerColumns = [
  [
    { href: "/hakkimizda", text: "Vizyon ve Misyon" },
    { href: "/akademik", text: "Akademik Programlar" },
    { href: "/kampus", text: "Kampüs Yaşamı" }
  ],
  [
    { href: "/kayit", text: "Kayıt Süreci" },
    { href: "/basari", text: "Başarılar" },
    { href: "/rehberlik", text: "Rehberlik" }
  ]
] as const;

export const socialLinks = [
  { href: "#", label: "Facebook", platform: "facebook" },
  { href: "#", label: "Instagram", platform: "instagram" },
  { href: "#", label: "YouTube", platform: "youtube" }
] as const;

export type DetailSection = {
  title: string;
  text: string;
  items?: string[];
};

export type DetailPage = {
  slug: string;
  navText: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  summary: string;
  sections: DetailSection[];
  highlights?: string[];
  stats?: { value: string; text: string }[];
};

export const detailPages: DetailPage[] = [
  {
    slug: "hakkimizda",
    navText: "Hakkımızda",
    title: "Fırat Eğitim Kurumları'nı Tanıyın",
    description:
      "Anaokulundan Anadolu Lisesi'ne uzanan eğitim yapısıyla öğrencinin akademik, sosyal ve kişisel gelişimini birlikte planlayan köklü bir okul kültürü.",
    image: "/images/firat-reception.webp",
    imageAlt: "Fırat Eğitim Kurumları giriş ve karşılama alanı",
    summary:
      "Fırat Eğitim Kurumları, 1987'den bu yana kendini yenileyen fiziki yapısı, deneyimli eğitim kadrosu ve çağdaş eğitim anlayışıyla öğrencinin geleceğini en iyi şekilde yönlendirmeyi hedefler.",
    sections: [
      {
        title: "Vizyonumuz",
        text: "Bağımsız düşünebilen ve karar verebilen, öğrenmekten zevk alan, Türkçeyi doğru ve etkili kullanan; ulusal ve evrensel değerlere bağlı, bilimsel düşünen ve çevresine duyarlı bireyler yetiştirmek."
      },
      {
        title: "Misyonumuz",
        text: "Atatürk milliyetçiliğine, Atatürk ilke ve inkılaplarına bağlı; çağa ve çevreye duyarlı, özgüveni gelişmiş, yüksek karakterli ve nitelikli bireyler için gelişime açık öğrenme ortamları hazırlamak."
      },
      {
        title: "Hedefimiz",
        text: "Anaokulundan liseye kadar öğrencinin yetenekleri doğrultusunda kariyer planlaması yapabilen, sorumluluk sahibi ve üretken bireyler yetiştiren bir eğitim yolculuğu sunmak."
      },
      {
        title: "Neden Fırat?",
        text: "Broşürlerde öne çıkan yaklaşımımız; sıcak bir aile ortamını, küçük sınıf yapısını ve öğrenciyi yakından tanıyan öğretmen kadrosunu aynı çatı altında toplar.",
        items: [
          "Sıcak bir aile ortamı",
          "15 kişilik özel sınıflar",
          "Özel grup çalışmaları",
          "Yabancı dil eğitimi",
          "Deneyimli eğitim kadrosu",
          "Sosyal etkinlikler",
          "Çağdaş ve modern eğitim anlayışı"
        ]
      }
    ]
  },
  {
    slug: "akademik",
    navText: "Akademik",
    title: "Anaokulundan Liseye Akademik Yolculuk",
    description:
      "Her yaş grubunun ihtiyacına göre yapılandırılmış programlar, akıllı sınıf uygulamaları, atölyeler ve rehberlik desteğiyle desteklenir.",
    image: "/images/firat-classroom.webp",
    imageAlt: "Fırat Eğitim Kurumları modern sınıf ortamı",
    summary:
      "Fırat'ta akademik süreç, öğrencinin yaşına ve gelişim düzeyine göre ilerler. Anaokulunda güvenli başlangıç, ilkokulda temel beceriler, ortaokulda disiplinli çalışma ve lisede hedef odaklı hazırlık öne çıkar.",
    sections: [
      {
        title: "Anaokulu",
        text: "Anaokulumuzda eğitim, çocuklarımızın sevgisini temel alarak oluşturulur. Anadili güzel kullanma becerisi, eğlenceli İngilizce dersleri, beden eğitimi, görsel sanatlar ve müzik çalışmalarıyla desteklenir."
      },
      {
        title: "İlkokul",
        text: "Anasınıfından eğitim yolculuğuna başlayan öğrencimiz, ilkokulda ayakları üzerinde sağlam durmanın ilk adımını atar; okumayı, yazmayı, arkadaşlık ilişkileri kurmayı ve kişisel bakım sorumluluğunu öğrenir."
      },
      {
        title: "Ortaokul",
        text: "Tüm sınıflarda uygulanan akıllı tahta sistemiyle teorik bilgiler uygulamalarla desteklenir; eğitim tekdüzelikten uzak, daha anlaşılır ve ilgi çekici hale gelir."
      },
      {
        title: "Anadolu Lisesi",
        text: "Öğrenci merkezli eğitim felsefesiyle öğrencilerin ilgi, gelişim ve ihtiyaçlarına uygun ortamlar hazırlanır; hedefledikleri mesleklere yönelmeleri için rehberlik çalışmaları yürütülür."
      },
      {
        title: "Atölye ve Beceri Dersleri",
        text: "Görsel sanatlar, bilişim ve müzik çalışmaları öğrencinin ifade gücünü, araştırma becerisini ve sosyal gelişimini destekler.",
        items: [
          "Görsel sanatlarda özgür ifade ve özgüven",
          "Bilişimde zengin donanım ve araştırma kültürü",
          "Müzikte ritim duygusu ve kulak duyarlılığı",
          "Sosyal etkinliklerle çok yönlü gelişim"
        ]
      }
    ],
    highlights: [
      "Akıllı tahta uygulamaları",
      "Bilişim ve fen laboratuvarı",
      "Yabancı dil gelişimi",
      "Sanat, spor ve sosyal etkinlikler"
    ]
  },
  {
    slug: "kayit",
    navText: "Kayıt",
    title: "Kayıt ve Tanışma Süreci",
    description:
      "Aileyi ve öğrenciyi tanıyarak başlayan süreç; kampüs gezisi, seviye değerlendirmesi ve kontenjan bilgilendirmesiyle netleşir.",
    image: "/images/firat-building.webp",
    imageAlt: "Fırat Eğitim Kurumları okul binası",
    summary:
      "Kayıt görüşmelerinde öğrencinin mevcut durumu, hedefleri ve ailenin beklentisi birlikte değerlendirilir. Böylece doğru kademe, doğru çalışma planı ve doğru iletişim zemini oluşturulur.",
    sections: [
      {
        title: "Ön Görüşme",
        text: "Öğrencinin eğitim geçmişi, güçlü yönleri, ihtiyaçları ve veli beklentileri birlikte dinlenir."
      },
      {
        title: "Kampüs Gezisi",
        text: "Sınıflar, bahçe, spor alanları, laboratuvar ve sosyal alanlar yerinde görülür; okul yaşamı aileye şeffaf biçimde aktarılır."
      },
      {
        title: "Akademik Değerlendirme",
        text: "Yaş grubuna uygun görüşme ve değerlendirme ile öğrencinin seviyesine göre doğru başlangıç planı hazırlanır."
      },
      {
        title: "Kayıt Planı",
        text: "Kontenjan, kademe, servis, yemek ve iletişim süreci netleştirilerek aileye anlaşılır bir kayıt akışı sunulur."
      }
    ],
    highlights: [
      "Anaokulu",
      "İlkokul",
      "Ortaokul",
      "Anadolu Lisesi"
    ]
  },
  {
    slug: "kampus",
    navText: "Kampüs",
    title: "Güvenli ve Yaşayan Kampüs",
    description:
      "Dersliklerden spor alanlarına, laboratuvarlardan etkinlik alanlarına kadar öğrencinin okul deneyimini zenginleştiren bir kampüs yaşamı.",
    image: "/images/firat-sports.webp",
    imageAlt: "Fırat Eğitim Kurumları spor alanı",
    summary:
      "Kampüs yaşamı yalnızca ders saatlerinden ibaret değildir. Fırat'ta öğrenciler güvenli alanlarda öğrenir, spor yapar, üretir, arkadaşlık kurar ve sosyal becerilerini geliştirir.",
    sections: [
      {
        title: "Modern Derslikler",
        text: "Akıllı tahta uygulamalarıyla sınıf içi anlatım görsel ve işitsel içeriklerle güçlendirilir."
      },
      {
        title: "Laboratuvar ve Atölyeler",
        text: "Bilişim ve fen alanlarında araştırma becerilerini destekleyen donanımlar, öğrenmeyi daha kalıcı hale getirir."
      },
      {
        title: "Spor ve Açık Alanlar",
        text: "Bahçe, oyun ve spor alanları öğrencinin bedensel gelişimine ve okul içi sosyal iletişimine alan açar."
      },
      {
        title: "Etkinlik Kültürü",
        text: "Hafta sonu etkinlikleri, sosyal çalışmalar, törenler ve kulüp faaliyetleri öğrencilerin çok yönlü gelişimini destekler."
      }
    ],
    highlights: [
      "Açık alanlar",
      "Spor sahası",
      "Laboratuvarlar",
      "Etkinlik ve tören alanları"
    ]
  },
  {
    slug: "basari",
    navText: "Başarı",
    title: "Başarı Takibi ve Sınav Hazırlığı",
    description:
      "Planlı çalışma, düzenli ölçme-değerlendirme ve rehberlik desteğiyle öğrencinin hedefi görünür hale gelir.",
    image: "/images/firat-yks-success.webp",
    imageAlt: "Fırat Koleji tam isabet YKS başarı görseli",
    summary:
      "Başarıyı tek sınav gününe bırakmayan bir takip anlayışı benimsiyoruz. Deneme analizleri, öğretmen gözlemleri ve rehberlik çalışmaları öğrencinin yol haritasını sürekli güncel tutar.",
    sections: [
      {
        title: "Hedef Odaklı Hazırlık",
        text: "Öğrencinin hedeflediği mesleğe ve bölüme göre çalışma alışkanlığı, ders takibi ve rehberlik görüşmeleri birlikte ilerler."
      },
      {
        title: "Düzenli Ölçme",
        text: "Deneme sınavları ve sınıf içi değerlendirmelerle eksikler erken görülür, öğrencinin gelişim planı somut verilerle desteklenir."
      },
      {
        title: "Bireysel Rehberlik",
        text: "Motivasyon, sistemli çalışma, zaman yönetimi ve sınav kaygısı konularında öğrencinin yanında olan bir rehberlik yaklaşımı uygulanır."
      }
    ],
    stats: [
      { value: "7", text: "ilk binde derece" },
      { value: "16", text: "ilk 5 binde derece" },
      { value: "26", text: "ilk 10 binde derece" }
    ],
    highlights: [
      "Deneme analizi",
      "Bireysel takip",
      "YKS hedef planı",
      "Rehberlik görüşmeleri"
    ]
  },
  {
    slug: "rehberlik",
    navText: "Rehberlik",
    title: "Öğrencinin Yanında Rehberlik",
    description:
      "Öğrencinin kendini tanımasına, sistemli çalışma alışkanlığı kazanmasına ve sağlıklı ilişkiler kurmasına destek olan rehberlik yaklaşımı.",
    image: "/images/firat-reading.webp",
    imageAlt: "Fırat Eğitim Kurumları öğrencileri açık alanda etkinlik yaparken",
    summary:
      "Rehberlik servisi, öğrencinin kendisini yalnız ya da çaresiz hissettiği anlarda da, hedef belirlediği dönemlerde de eğitim yolculuğunun yanında olur.",
    sections: [
      {
        title: "Kendini Tanıma",
        text: "Öğrencinin güçlü yönlerini, ihtiyaçlarını ve hedeflerini fark etmesine yardımcı olan görüşmeler yapılır."
      },
      {
        title: "Sistemli Çalışma",
        text: "Planlı çalışma alışkanlığı, zaman yönetimi ve sorumluluk bilinci yaş grubuna uygun yöntemlerle desteklenir."
      },
      {
        title: "Uyumlu İlişkiler",
        text: "Arkadaşlık, iletişim ve okul yaşamına uyum süreçlerinde öğrencinin sosyal gelişimi yakından izlenir."
      },
      {
        title: "Veli İletişimi",
        text: "Öğretmen, rehberlik birimi ve veli arasındaki düzenli iletişim öğrencinin gelişimini daha görünür hale getirir."
      }
    ],
    highlights: [
      "Öğrenci görüşmeleri",
      "Çalışma alışkanlığı",
      "Sınav kaygısı desteği",
      "Veli bilgilendirmesi"
    ]
  }
];

export function getDetailPage(slug: string) {
  return detailPages.find((page) => page.slug === slug);
}
