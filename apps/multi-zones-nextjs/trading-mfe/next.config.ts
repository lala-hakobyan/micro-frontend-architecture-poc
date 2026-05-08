import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-mfe.trading.com'],
  basePath: '/trading',
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
