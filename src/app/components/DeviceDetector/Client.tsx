"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSideMenuOpen } from "@/store/slices/components";
import { setIsMobile } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DeviceDetectorClient() {
  const { user } = useAppSelector((s) => s.user);

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      const screenSize = window.innerWidth;
      const isMobile = screenSize <= 768;
      dispatch(setIsMobile(isMobile));

      if (!isMobile) {
        router.push("/");
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
