/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "marketplace-production-ea01.up.railway.app",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
