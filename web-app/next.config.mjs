/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://back-end:4000/:path*",
      },
    ];
  },
};

export default nextConfig;
