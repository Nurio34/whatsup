"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsMobile } from "@/store/slices/user";
import { useEffect } from "react";

function DeviceDetectorClient() {
    const { user } = useAppSelector((s) => s.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkScreenSize = () => {
            const screenSize = window.innerWidth;
            const isMobile = screenSize <= 768;
            dispatch(setIsMobile(isMobile));
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);
        window.addEventListener("DOMContentLoaded", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
            window.removeEventListener("DOMContentLoaded", checkScreenSize);
        };
    }, [dispatch, user]);

    return <div className=" absolute -z-50"></div>;
}

export default DeviceDetectorClient;
