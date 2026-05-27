import type { NextConfig } from "next";

// MFE ports/URLs
const {
    NEXT_PUBLIC_MARKET_DATA_URL = "http://localhost:5001",
    NEXT_PUBLIC_MARKET_DATA_DETAILS_URL = "http://localhost:5004",
    NEXT_PUBLIC_PORTFOLIO_URL = "http://localhost:5002",
    NEXT_PUBLIC_TRADING_URL = "http://localhost:5003",
} = process.env;

const nextConfig: NextConfig = {
    allowedDevOrigins: ['shell.local-fintech.com'],
    reactCompiler: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/market-data',
                permanent: true
            }
        ]
    },
    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: "/market-data-details/_next/:path*",
                    destination: `${NEXT_PUBLIC_MARKET_DATA_DETAILS_URL}/market-data/_next/:path*`,
                },
                {
                    source: "/market-data/_next/:path*",
                    destination: `${NEXT_PUBLIC_MARKET_DATA_URL}/market-data/_next/:path*`,
                },
                {
                    source: "/portfolio/_next/:path*",
                    destination: `${NEXT_PUBLIC_PORTFOLIO_URL}/portfolio/_next/:path*`,
                },
                {
                    source: "/trading/_next/:path*",
                    destination: `${NEXT_PUBLIC_TRADING_URL}/trading/_next/:path*`,
                }
            ],
            afterFiles: [
                {
                    source: "/market-data/:id+",
                    destination: `${NEXT_PUBLIC_MARKET_DATA_DETAILS_URL}/market-data/:id+`,
                },
                {
                    source: "/market-data",
                    destination: `${NEXT_PUBLIC_MARKET_DATA_URL}/market-data`,
                },
                {
                    source: "/portfolio",
                    destination: `${NEXT_PUBLIC_PORTFOLIO_URL}/portfolio`,
                },
                {
                    source: "/portfolio/:path+",
                    destination: `${NEXT_PUBLIC_PORTFOLIO_URL}/portfolio/:path+`,
                },
                {
                    source: "/trading",
                    destination: `${NEXT_PUBLIC_TRADING_URL}/trading`,
                },
                {
                    source: "/trading/:path+",
                    destination: `${NEXT_PUBLIC_TRADING_URL}/trading/:path+`,
                }
            ],
            fallback: []
        };
    }
};

export default nextConfig;
