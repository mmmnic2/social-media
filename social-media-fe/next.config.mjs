/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mtv.vn",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
