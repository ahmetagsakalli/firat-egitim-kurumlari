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
      "Anaokulundan Anadolu Lisesi'ne uzanan eğitim yapımızla öğrencilerimizin akademik, sosyal ve kişisel gelişimini birlikte planlıyoruz.",
    image: "/images/firat-reception.webp",
    imageAlt: "Fırat Eğitim Kurumları giriş ve karşılama alanı",
    summary:
      "Fırat Eğitim Kurumları olarak 1987'den bu yana kendini yenileyen fiziki yapımız, deneyimli eğitim kadromuz ve çağdaş eğitim anlayışımızla öğrencilerimizin geleceğine yön veriyoruz.",
    sections: [
      {
        title: "Vizyonumuz",
        text: "Bağımsız düşünebilen ve karar verebilen, öğrenmekten zevk alan, Türkçeyi doğru ve etkili kullanan; ulusal ve evrensel değerlere bağlı, bilimsel düşünen ve çevresine duyarlı bireyler yetiştirmeyi amaçlıyoruz."
      },
      {
        title: "Misyonumuz",
        text: "Atatürk milliyetçiliğine, Atatürk ilke ve inkılaplarına bağlı; çağa ve çevreye duyarlı, özgüveni gelişmiş, yüksek karakterli ve nitelikli bireyler için gelişime açık öğrenme ortamları hazırlıyoruz."
      },
      {
        title: "Hedefimiz",
        text: "Anaokulundan liseye kadar öğrencilerimizin yetenekleri doğrultusunda kariyer planlamasını destekleyen, sorumluluk sahibi ve üretken bireyler yetiştiren bir eğitim yolculuğu sunuyoruz."
      },
      {
        title: "Neden Fırat?",
        text: "Fırat'ta sıcak bir aile ortamını, küçük sınıf yapısını ve öğrencilerimizi yakından tanıyan öğretmen kadromuzu aynı çatı altında buluşturuyoruz.",
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
      "Her yaş grubunun ihtiyacına göre yapılandırdığımız programları akıllı sınıf uygulamaları, atölyeler ve rehberlik desteğiyle güçlendiriyoruz.",
    image: "/images/firat-classroom.webp",
    imageAlt: "Fırat Eğitim Kurumları modern sınıf ortamı",
    summary:
      "Fırat'ta akademik süreci öğrencilerimizin yaşına ve gelişim düzeyine göre planlıyoruz. Anaokulunda güvenli başlangıcı, ilkokulda temel becerileri, ortaokulda disiplinli çalışmayı ve lisede hedef odaklı hazırlığı öne çıkarıyoruz.",
    sections: [
      {
        title: "Anaokulu",
        text: "Anaokulumuzda eğitimi çocuklarımıza duyduğumuz sevgiyi temel alarak oluşturuyoruz. Anadili güzel kullanma becerisini eğlenceli İngilizce dersleri, beden eğitimi, görsel sanatlar ve müzik çalışmalarıyla destekliyoruz."
      },
      {
        title: "İlkokul",
        text: "Anasınıfından eğitim yolculuğuna başlayan öğrencimiz, ilkokulda ayakları üzerinde sağlam durmanın ilk adımını atar; okumayı, yazmayı, arkadaşlık ilişkileri kurmayı ve kişisel bakım sorumluluğunu öğrenir."
      },
      {
        title: "Ortaokul",
        text: "Tüm sınıflarda kullandığımız akıllı tahta sistemiyle teorik bilgileri uygulamalarla destekliyor; eğitimi tekdüzelikten uzak, daha anlaşılır ve ilgi çekici hale getiriyoruz."
      },
      {
        title: "Anadolu Lisesi",
        text: "Öğrenci merkezli eğitim felsefemizle öğrencilerimizin ilgi, gelişim ve ihtiyaçlarına uygun ortamlar hazırlıyor; hedefledikleri mesleklere yönelmeleri için rehberlik çalışmaları yürütüyoruz."
      },
      {
        title: "Atölye ve Beceri Dersleri",
        text: "Görsel sanatlar, bilişim ve müzik çalışmalarıyla öğrencilerimizin ifade gücünü, araştırma becerisini ve sosyal gelişimini destekliyoruz.",
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
      "Aileyi ve öğrencimizi tanıyarak başladığımız süreci kampüs gezisi, seviye değerlendirmesi ve kontenjan bilgilendirmesiyle birlikte netleştiriyoruz.",
    image: "/uploads/firat-kayit-kampus-2026-08-26.jpg",
    imageAlt: "Fırat Eğitim Kurumları okul binası ve kampüs girişi",
    summary:
      "Kayıt görüşmelerinde öğrencimizin mevcut durumunu, hedeflerini ve velimizin beklentilerini birlikte değerlendiriyoruz. Böylece doğru kademe, doğru çalışma planı ve doğru iletişim zeminini oluşturuyoruz.",
    sections: [
      {
        title: "Ön Görüşme",
        text: "Öğrencimizin eğitim geçmişini, güçlü yönlerini, ihtiyaçlarını ve veli beklentilerini birlikte dinliyoruz."
      },
      {
        title: "Kampüs Gezisi",
        text: "Sınıfları, bahçeyi, spor alanlarını, laboratuvarı ve sosyal alanları yerinde gösteriyor; okul yaşamımızı aileye şeffaf biçimde aktarıyoruz."
      },
      {
        title: "Akademik Değerlendirme",
        text: "Yaş grubuna uygun görüşme ve değerlendirme ile öğrencimizin seviyesine göre doğru başlangıç planını hazırlıyoruz."
      },
      {
        title: "Kayıt Planı",
        text: "Kontenjan, kademe, servis, yemek ve iletişim sürecini netleştirerek aileye anlaşılır bir kayıt akışı sunuyoruz."
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
      "Kampüs yaşamını yalnızca ders saatleriyle sınırlamıyoruz. Fırat'ta öğrencilerimizin güvenli alanlarda öğrenmesini, spor yapmasını, üretmesini, arkadaşlık kurmasını ve sosyal becerilerini geliştirmesini destekliyoruz.",
    sections: [
      {
        title: "Modern Derslikler",
        text: "Akıllı tahta uygulamalarıyla sınıf içi anlatımı görsel ve işitsel içeriklerle güçlendiriyoruz."
      },
      {
        title: "Laboratuvar ve Atölyeler",
        text: "Bilişim ve fen alanlarında araştırma becerilerini destekleyen donanımlarla öğrenmeyi daha kalıcı hale getiriyoruz."
      },
      {
        title: "Spor ve Açık Alanlar",
        text: "Bahçe, oyun ve spor alanlarımızla öğrencilerimizin bedensel gelişimine ve okul içi sosyal iletişimine alan açıyoruz."
      },
      {
        title: "Etkinlik Kültürü",
        text: "Hafta sonu etkinlikleri, sosyal çalışmalar, törenler ve kulüp faaliyetleriyle öğrencilerimizin çok yönlü gelişimini destekliyoruz."
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
      "Planlı çalışma, düzenli ölçme-değerlendirme ve rehberlik desteğiyle öğrencimizin hedefini görünür hale getiriyoruz.",
    image: "/images/firat-yks-success.webp",
    imageAlt: "Fırat Koleji tam isabet YKS başarı görseli",
    summary:
      "Başarıyı tek sınav gününe bırakmayan bir takip anlayışı benimsiyoruz. Deneme analizleri, öğretmen gözlemleri ve rehberlik çalışmalarıyla öğrencimizin yol haritasını sürekli güncel tutuyoruz.",
    sections: [
      {
        title: "Hedef Odaklı Hazırlık",
        text: "Öğrencimizin hedeflediği mesleğe ve bölüme göre çalışma alışkanlığını, ders takibini ve rehberlik görüşmelerini birlikte yürütüyoruz."
      },
      {
        title: "Düzenli Ölçme",
        text: "Deneme sınavları ve sınıf içi değerlendirmelerle eksikleri erken görüyor, öğrencimizin gelişim planını somut verilerle destekliyoruz."
      },
      {
        title: "Bireysel Rehberlik",
        text: "Motivasyon, sistemli çalışma, zaman yönetimi ve sınav kaygısı konularında öğrencimizin yanında olan bir rehberlik yaklaşımı uyguluyoruz."
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
      "Öğrencimizin kendini tanımasına, sistemli çalışma alışkanlığı kazanmasına ve sağlıklı ilişkiler kurmasına destek oluyoruz.",
    image: "/images/firat-reading.webp",
    imageAlt: "Fırat Eğitim Kurumları öğrencileri açık alanda etkinlik yaparken",
    summary:
      "Rehberlik servisimizle, öğrencimizin kendisini yalnız ya da çaresiz hissettiği anlarda da, hedef belirlediği dönemlerde de eğitim yolculuğunun yanında oluyoruz.",
    sections: [
      {
        title: "Kendini Tanıma",
        text: "Öğrencimizin güçlü yönlerini, ihtiyaçlarını ve hedeflerini fark etmesine yardımcı olan görüşmeler yapıyoruz."
      },
      {
        title: "Sistemli Çalışma",
        text: "Planlı çalışma alışkanlığını, zaman yönetimini ve sorumluluk bilincini yaş grubuna uygun yöntemlerle destekliyoruz."
      },
      {
        title: "Uyumlu İlişkiler",
        text: "Arkadaşlık, iletişim ve okul yaşamına uyum süreçlerinde öğrencimizin sosyal gelişimini yakından izliyoruz."
      },
      {
        title: "Veli İletişimi",
        text: "Öğretmen, rehberlik birimi ve veli arasındaki düzenli iletişimle öğrencimizin gelişimini daha görünür hale getiriyoruz."
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
