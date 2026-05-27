import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['portfolio.local-fintech.com', 'shell.local-fintech.com'],
  basePath: '/portfolio',
  reactCompiler: true,
};

export default nextConfig;
