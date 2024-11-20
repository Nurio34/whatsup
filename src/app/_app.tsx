import useServiceWorker from "@/hooks/useServiceWorker";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    useServiceWorker();

    return <Component {...pageProps} />;
}

export default MyApp;
