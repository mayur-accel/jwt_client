/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1",
        destination: "http://localhost:3001/",
      },
    ];
  },
};

export default nextConfig;
