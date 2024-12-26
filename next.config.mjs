/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: "/404", // Redirect all API routes to a 404 page
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
