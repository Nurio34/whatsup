import { useEffect } from "react";

const useServiceWorker = () => {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("Service Worker registered:", registration);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });

            // Listen for the service worker controller change event
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (
                    confirm(
                        "A new version of the app is available. Do you want to reload?",
                    )
                ) {
                    window.location.reload();
                }
            });
        }
    }, []);
};

export default useServiceWorker;
