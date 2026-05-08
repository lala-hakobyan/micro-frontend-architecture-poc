import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-mfe.portfolio.com'],
  basePath: '/portfolio',
  reactCompiler: true,
};

export default nextConfig;
