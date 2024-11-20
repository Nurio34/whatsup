"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsMobile } from "@/store/slices/user";
import { useEffect } from "react";

function DeviceDetectorClient() {
    const { isMobile } = useAppSelector((s) => s.user);
    console.log(isMobile);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkScreenSize = () => {
            const screenSize = window.innerWidth;
            const isMobile = screenSize <= 768;
            dispatch(setIsMobile(isMobile));
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, [dispatch]);

    return <div className=" absolute -z-50"></div>;
}

export default DeviceDetectorClient;
