import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cdn.fakercloud.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
