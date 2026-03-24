import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ekpqpwppkeephpyvodbp.supabase.co',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/api/:path*"   // твой backend локально
                        : "/api/:path*",                        // в продакшене уже на том же сервере
            },
        ];
    },
};

export default nextConfig;
