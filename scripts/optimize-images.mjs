import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "work-assets", "firat-originals");
const outputDir = path.join(root, "public", "images");

const webpImages = [
  {
    input: "hero-field.jpg",
    output: "firat-hero.webp",
    width: 1920,
    height: 960,
    quality: 78
  },
  {
    input: "building.jpg",
    output: "firat-building.webp",
    width: 1000,
    height: 760,
    quality: 80
  },
  {
    input: "reception-logo.jpg",
    output: "firat-reception.webp",
    width: 1200,
    height: 760,
    quality: 79
  },
  {
    input: "classroom.jpg",
    output: "firat-classroom.webp",
    width: 980,
    height: 700,
    quality: 79
  },
  {
    input: "sports.jpg",
    output: "firat-sports.webp",
    width: 980,
    height: 700,
    quality: 78
  },
  {
    input: "kindergarten.jpg",
    output: "firat-kindergarten.webp",
    width: 900,
    height: 700,
    quality: 80
  },
  {
    input: "ceremony.jpg",
    output: "firat-ceremony.webp",
    width: 900,
    height: 680,
    quality: 80
  },
  {
    input: "reading-field.jpg",
    output: "firat-reading.webp",
    width: 1180,
    height: 740,
    quality: 78
  },
  {
    input: "playground.jpg",
    output: "firat-playground.webp",
    width: 980,
    height: 680,
    quality: 80
  },
  {
    input: "yks-success.jpg",
    output: "firat-yks-success.webp",
    width: 920,
    height: 640,
    quality: 82
  }
];

await fs.mkdir(outputDir, { recursive: true });

for (const image of webpImages) {
  await sharp(path.join(sourceDir, image.input))
    .rotate()
    .resize(image.width, image.height, {
      fit: "cover",
      position: image.position ?? "center",
      withoutEnlargement: true
    })
    .sharpen({ sigma: 0.35 })
    .webp({ quality: image.quality, effort: 6 })
    .toFile(path.join(outputDir, image.output));
}

await sharp(path.join(sourceDir, "logo.png"))
  .resize(192, 192, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 }
  })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(outputDir, "firat-logo.png"));

await sharp(path.join(sourceDir, "firat-ek-logo.png"))
  .trim({ background: "#ffffff", threshold: 12 })
  .extend({ top: 18, right: 26, bottom: 18, left: 26, background: "#ffffff" })
  .resize({ width: 420, withoutEnlargement: true })
  .webp({ quality: 88, effort: 6 })
  .toFile(path.join(outputDir, "firat-ek-logo.webp"));

const ogBase = await sharp(path.join(sourceDir, "hero-field.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.62, saturation: 0.86 })
  .toBuffer();

const ogOverlay = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="rgba(8,18,44,0.46)"/>
  <rect x="72" y="86" width="10" height="426" rx="5" fill="#c92032"/>
  <text x="112" y="210" font-family="Arial, sans-serif" font-size="54" font-weight="800" fill="#ffffff">Fırat Eğitim Kurumları</text>
  <text x="112" y="298" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#ffffff">Anaokulundan liseye güçlü eğitim</text>
  <text x="112" y="380" font-family="Arial, sans-serif" font-size="30" font-weight="500" fill="rgba(255,255,255,0.88)">Güvenli kampüs, akademik takip ve öğrenciyi merkeze alan yaklaşım.</text>
  <rect x="112" y="438" width="302" height="58" rx="29" fill="#c92032"/>
  <text x="148" y="477" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#ffffff">Kayıt Görüşmesi</text>
</svg>`);

await sharp(ogBase)
  .composite([{ input: ogOverlay, top: 0, left: 0 }])
  .webp({ quality: 82, effort: 6 })
  .toFile(path.join(outputDir, "og-image.webp"));

const files = await fs.readdir(outputDir);
for (const file of files.filter((item) => item.startsWith("firat-") || item === "og-image.webp")) {
  const stat = await fs.stat(path.join(outputDir, file));
  console.log(`${file}: ${Math.round(stat.size / 1024)} KB`);
}
