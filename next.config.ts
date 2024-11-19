import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    images: {
        domains: [
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com",
            "localhost",
            "whatsup-lime-rho.vercel.app",
        ],
    },
};

export default withPWA({
    ...nextConfig,
    pwa: {
        dest: "public", // The output directory for the service worker and manifest
        disable: process.env.NODE_ENV === "development", // Disable PWA in development
        register: true, // Registers the service worker automatically
        skipWaiting: true, // Activate the service worker immediately after installing
    },
});
