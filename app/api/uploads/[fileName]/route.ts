import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import {
  getUploadedImageContentType,
  getUploadedImagePath
} from "../../../cms/upload-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function imageNotFound() {
  return NextResponse.json(
    { error: "Görsel bulunamadı." },
    {
      headers: {
        "Cache-Control": "no-store"
      },
      status: 404
    }
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileName: string }> }
) {
  const { fileName } = await params;

  if (!/^[a-z0-9][a-z0-9.-]*\.(avif|jpe?g|png|svg|webp)$/i.test(fileName)) {
    return imageNotFound();
  }

  try {
    const image = await readFile(getUploadedImagePath(fileName));

    return new NextResponse(image, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": getUploadedImageContentType(fileName)
      }
    });
  } catch {
    return imageNotFound();
  }
}
