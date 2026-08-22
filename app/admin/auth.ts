import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "firat_admin_session";
const sessionValue = "admin";
const authFilePath = path.join(process.cwd(), "content", "admin-auth.json");
const passwordSaltRounds = 12;

type StoredAdminAuth = {
  passwordHash: string;
  updatedAt: string;
  version: 1;
};

function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD;
  }

  return process.env.NODE_ENV === "production" ? "" : "firat2026";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "firat-local-admin-session";
}

function sign(value: string) {
  const signature = createHmac("sha256", getSessionSecret()).update(value).digest("hex");

  return `${value}.${signature}`;
}

function safeEqual(first: string, second: string) {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  return firstBuffer.length === secondBuffer.length && timingSafeEqual(firstBuffer, secondBuffer);
}

async function readStoredAdminAuth() {
  try {
    const file = await readFile(authFilePath, "utf8");
    const parsed = JSON.parse(file) as Partial<StoredAdminAuth>;

    if (parsed.version !== 1 || typeof parsed.passwordHash !== "string") {
      return null;
    }

    return parsed as StoredAdminAuth;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

function isValidSession(value?: string) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = sign(payload).split(".")[1];

  return payload === sessionValue && safeEqual(signature, expectedSignature);
}

export async function isValidAdminPassword(password: string) {
  const storedAuth = await readStoredAdminAuth();

  if (storedAuth?.passwordHash) {
    return compare(password, storedAuth.passwordHash);
  }

  const expectedPassword = getAdminPassword();

  return Boolean(expectedPassword) && safeEqual(password, expectedPassword);
}

export async function updateAdminPassword(password: string) {
  const passwordHash = await hash(password, passwordSaltRounds);

  await mkdir(path.dirname(authFilePath), { recursive: true });
  await writeFile(
    authFilePath,
    `${JSON.stringify(
      {
        passwordHash,
        updatedAt: new Date().toISOString(),
        version: 1
      } satisfies StoredAdminAuth,
      null,
      2
    )}\n`,
    "utf8"
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return isValidSession(cookieStore.get(cookieName)?.value);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(cookieName, sign(sessionValue), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(cookieName);
}
