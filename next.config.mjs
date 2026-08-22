/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  compress: true,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    serverActions: {
      bodySizeLimit: "12mb"
    }
  }
};

export default nextConfig;
