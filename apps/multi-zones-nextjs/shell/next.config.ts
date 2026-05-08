import type { NextConfig } from "next";

// Define your MFE ports/URLs
const {
    DETAILS_URL = "http://localhost:5004",
    PORTFOLIO_URL = "http://localhost:5002",
    TRADING_URL = "http://localhost:5003",
} = process.env;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-mfe.shell.com'],
  /* config options here */
  reactCompiler: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/market-data',
  //       permanent: true
  //     }
  //   ]
  // },
  // basePath: '/market-data',
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/market-data/_next/:path*",
                    destination: `${DETAILS_URL}/market-data/_next/:path*`,
                },
                {
                    source: "/portfolio/_next/:path*",
                    destination: `${PORTFOLIO_URL}/portfolio/_next/:path*`,
                },
                {
                    source: "/trading/_next/:path*",
                    destination: `${TRADING_URL}/trading/_next/:path*`,
                }
            ],
            afterFiles: [
                {
                    source: "/market-data/:id+",
                    destination: `${DETAILS_URL}/market-data/:id+`,
                },
                {
                    source: "/portfolio",
                    destination: `${PORTFOLIO_URL}/portfolio`,
                },
                {
                    source: "/portfolio/:path+",
                    destination: `${PORTFOLIO_URL}/portfolio/:path+`,
                },
                {
                    source: "/trading",
                    destination: `${TRADING_URL}/trading`,
                },
                {
                    source: "/trading/:path+",
                    destination: `${TRADING_URL}/trading/:path+`,
                }
            ],
            fallback: []
        };
    }
};

export default nextConfig;
