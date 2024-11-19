declare module "next-pwa" {
    import { NextConfig } from "next";

    interface PWAConfig {
        dest: string;
        disable?: boolean;
        register?: boolean;
        skipWaiting?: boolean;
        [key: string]: any;
    }

    function withPWA(config: NextConfig & { pwa?: PWAConfig }): NextConfig;

    export default withPWA;
}
