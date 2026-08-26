import "server-only";

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { uploadedImageRoutePrefix } from "./image-src";

export function getUploadsDir() {
  const configuredUploadsDir = process.env.UPLOADS_DIR?.trim();

  return configuredUploadsDir
    ? path.resolve(configuredUploadsDir)
    : path.join(process.cwd(), "public", "uploads");
}

export async function ensureUploadsDir() {
  const uploadsDir = getUploadsDir();

  await mkdir(uploadsDir, { recursive: true });

  return uploadsDir;
}

export function getUploadedImagePath(fileName: string) {
  const safeFileName = path.basename(fileName);

  return path.join(/*turbopackIgnore: true*/ getUploadsDir(), safeFileName);
}

export function getUploadedImageUrl(fileName: string) {
  return `${uploadedImageRoutePrefix}/${encodeURIComponent(path.basename(fileName))}`;
}

export function getUploadedImageContentType(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();

  if (extension === ".avif") {
    return "image/avif";
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return "image/jpeg";
  }

  if (extension === ".png") {
    return "image/png";
  }

  if (extension === ".svg") {
    return "image/svg+xml";
  }

  return "image/webp";
}
