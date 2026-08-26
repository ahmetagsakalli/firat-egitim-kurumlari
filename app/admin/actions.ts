"use server";

import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import {
  createAdminSession,
  clearAdminSession,
  isValidAdminPassword,
  requireAdmin,
  updateAdminPassword
} from "./auth";
import { saveSiteContent } from "../cms/content";
import type { SiteContent } from "../cms/types";
import { ensureUploadsDir, getUploadedImageUrl } from "../cms/upload-storage";

export type AdminActionState = {
  ok?: boolean;
  error?: string;
  savedAt?: string;
};

export type UploadImageResult = {
  ok?: boolean;
  path?: string;
  error?: string;
};

export type ChangePasswordResult = {
  ok?: boolean;
  error?: string;
  message?: string;
};

function slugifyFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

export async function loginAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  const password = String(formData.get("password") ?? "");

  if (!(await isValidAdminPassword(password))) {
    return {
      error: "Şifre hatalı. Lütfen tekrar deneyin."
    };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function changePasswordAction(formData: FormData): Promise<ChangePasswordResult> {
  await requireAdmin();

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Lütfen tüm şifre alanlarını doldurun." };
  }

  if (!(await isValidAdminPassword(currentPassword))) {
    return { error: "Mevcut şifre hatalı." };
  }

  if (newPassword.length < 8) {
    return { error: "Yeni şifre en az 8 karakter olmalı." };
  }

  if (newPassword.length > 128) {
    return { error: "Yeni şifre 128 karakterden kısa olmalı." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Yeni şifreler eşleşmiyor." };
  }

  if (newPassword === currentPassword) {
    return { error: "Yeni şifre mevcut şifreden farklı olmalı." };
  }

  await updateAdminPassword(newPassword);

  return {
    ok: true,
    message: "Şifre güncellendi."
  };
}

export async function saveContentAction(
  _previousState: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  await requireAdmin();

  try {
    const rawContent = String(formData.get("content") ?? "");
    const content = JSON.parse(rawContent) as SiteContent;
    const savedContent = await saveSiteContent(content);

    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
    savedContent.detailPages.forEach((page) => revalidatePath(`/${page.slug}`));

    return {
      ok: true,
      savedAt: new Intl.DateTimeFormat("tr-TR", {
        dateStyle: "short",
        timeStyle: "medium"
      }).format(new Date())
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "İçerik kaydedilemedi."
    };
  }
}

export async function uploadImageAction(formData: FormData): Promise<UploadImageResult> {
  await requireAdmin();

  try {
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return { error: "Lütfen bir görsel seçin." };
    }

    if (!file.type.startsWith("image/")) {
      return { error: "Sadece görsel dosyası yükleyebilirsiniz." };
    }

    if (file.size > 12 * 1024 * 1024) {
      return { error: "Görsel boyutu 12 MB altında olmalı." };
    }

    const sourceBuffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name.replace(/\.[^.]+$/, "");
    const safeName = slugifyFileName(originalName) || "gorsel";
    const fileName = `${Date.now()}-${randomUUID().slice(0, 8)}-${safeName}.webp`;
    const uploadsDir = await ensureUploadsDir();
    const filePath = path.join(uploadsDir, fileName);

    await sharp(sourceBuffer)
      .rotate()
      .resize({
        width: 1920,
        height: 1400,
        fit: "inside",
        withoutEnlargement: true
      })
      .webp({ quality: 82 })
      .toFile(filePath);

    return {
      ok: true,
      path: getUploadedImageUrl(fileName)
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Görsel yüklenemedi."
    };
  }
}
