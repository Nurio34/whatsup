"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSideMenuOpen, setScreenHeight } from "@/store/slices/components";
import { setIsMobile } from "@/store/slices/user";
import { useEffect } from "react";

function DeviceDetectorClient() {
  const { user } = useAppSelector((s) => s.user);

  const dispatch = useAppDispatch();

  // const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth <= 768;
      dispatch(setIsMobile(isMobile));

      const screenHeight = window.innerHeight;
      dispatch(setScreenHeight(screenHeight));

      if (!isMobile) {
        dispatch(setIsSideMenuOpen(true));
      } else {
        dispatch(setIsSideMenuOpen(false));
      }
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
