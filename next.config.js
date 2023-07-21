/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'target.scene7.com',
      },
      {
        protocol: "https",
        hostname: 'corporate.target.com'
      }
    ],
  },
};

module.exports = nextConfig;
