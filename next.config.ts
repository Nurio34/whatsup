import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "whatsup-lime-rho.vercel.app",
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;
