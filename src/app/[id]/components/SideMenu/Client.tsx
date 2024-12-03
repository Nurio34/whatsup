"use client";

import BottomNavButtons from "./_components/BottomNavButtons";
import TopNavButtons from "./_components/TopNavButtons";
import MenuToggleButton from "./_components/MenuToggleButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsSideMenuOpen,
  setIsSideMenuOpen,
} from "@/store/slices/components";
import { useEffect } from "react";
import { selectIsMoile } from "@/store/slices/user";

function SideMenuNavClient() {
  const isMobile = useAppSelector(selectIsMoile);
  const isSideMenuOpen = useAppSelector(selectIsSideMenuOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const closeSideMenuNav = (e: MouseEvent) => {
      const SideMenuNav = document.querySelector("#SideMenuNav");

      if (e.target === SideMenuNav || SideMenuNav?.contains(e.target as Node)) {
      } else {
        dispatch(setIsSideMenuOpen(false));
      }
    };

    if (isMobile) {
      document.addEventListener("click", closeSideMenuNav);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener("click", closeSideMenuNav);
      }
    };
  }, [dispatch]);

  return (
    <nav
      id="SideMenuNav"
      className={`py-[2vh] px-[1vw] min-w-[43.0312px] md:min-w-[69.1719px]
          grid items-center transition-all
          fixed md:relative z-50 bg-white h-full md:h-screen
          ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <TopNavButtons />
      <BottomNavButtons />
      <MenuToggleButton isSideMenuOpen={isSideMenuOpen} />
    </nav>
  );
}

export default SideMenuNavClient;
