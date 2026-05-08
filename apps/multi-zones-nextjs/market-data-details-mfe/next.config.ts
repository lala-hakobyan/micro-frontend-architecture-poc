import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-mfe.market-data-details.com'],
  basePath: '/market-data',
  assetPrefix: '/market-data',
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
