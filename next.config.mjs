/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu.chat-img.sintra.ai",
      },
    ],
  },
};

export default nextConfig;
