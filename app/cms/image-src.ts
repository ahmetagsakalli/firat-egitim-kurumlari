export const uploadedImageRoutePrefix = "/api/uploads";

export function resolveImageSrc(src: string) {
  const trimmedSrc = src.trim();
  const uploadedFileName = trimmedSrc.match(/^\/uploads\/([^/]+)$/)?.[1];

  if (uploadedFileName) {
    return `${uploadedImageRoutePrefix}/${encodeURIComponent(uploadedFileName)}`;
  }

  return trimmedSrc;
}
