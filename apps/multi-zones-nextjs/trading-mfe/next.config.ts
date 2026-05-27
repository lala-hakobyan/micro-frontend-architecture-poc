import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-mfe.trading.com', 'shell.local-fintech.com'],
  basePath: '/trading',
  reactCompiler: true,
};

export default nextConfig;
