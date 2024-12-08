"use client";

import BottomNavButtons from "./_components/BottomNavButtons";
import TopNavButtons from "./_components/TopNavButtons";
import MenuToggleButton from "./_components/MenuToggleButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsSideMenuOpen,
  selectRenderedComponent,
  setIsSideMenuOpen,
} from "@/store/slices/components";
import { useEffect } from "react";
import { selectIsMoile } from "@/store/slices/user";

function SideMenuNavClient({
  desktop,
  height,
}: {
  desktop: boolean;
  height?: number;
}) {
  const isMobile = useAppSelector(selectIsMoile);
  const isSideMenuOpen = useAppSelector(selectIsSideMenuOpen);
  const renderedComponent = useAppSelector(selectRenderedComponent);
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
  }, [dispatch, isMobile]);

  const desktopCondition = !isMobile && desktop;
  const mobileMenuRenderedCondition =
    desktop && isMobile && renderedComponent === "menu";
  const mobileScreenRenderedCondition =
    isMobile && !desktop && renderedComponent === "screen";
  const conditions =
    desktopCondition ||
    mobileMenuRenderedCondition ||
    mobileScreenRenderedCondition;

  return (
    <>
      {conditions && (
        <nav
          id="SideMenuNav"
          className={`py-[2vh] px-[1vw] min-w-[43.0312px] md:min-w-[69.1719px] bg-white
            grid items-center transition-all h-screen
            
            ${mobileMenuRenderedCondition ? "fixed  z-50 h-full" : ""}
            ${mobileScreenRenderedCondition ? " fixed " : ""}
            
            ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          style={{ height: mobileScreenRenderedCondition ? height : undefined }}
        >
          <TopNavButtons />
          <BottomNavButtons />
          <MenuToggleButton isSideMenuOpen={isSideMenuOpen} />
        </nav>
      )}
    </>
  );
}

export default SideMenuNavClient;
