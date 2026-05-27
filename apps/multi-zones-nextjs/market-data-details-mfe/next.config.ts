import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['market-data-details.local-fintech.com', 'shell.local-fintech.com'],
  basePath: '/market-data',
  assetPrefix: '/market-data-details',
  reactCompiler: true,
};

export default nextConfig;
