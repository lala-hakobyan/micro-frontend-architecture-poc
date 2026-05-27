import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['market-data.local-fintech.com', 'shell.local-fintech.com'],
    basePath: '/market-data',
    assetPrefix: '/market-data',
    reactCompiler: true,
};
export default nextConfig;
