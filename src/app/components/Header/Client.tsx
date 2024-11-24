"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";
import { getHeight, selectHeaderHeight } from "@/store/slices/components";
import Logo from "./components/Logo";
import LoginLinkButton from "./components/LoginLinkButton";

function HeaderClient() {
  const HeaderElement = useRef<HTMLElement | null>(null);

  const { user } = useAppSelector((s) => s.user);
  const headerHeight = useAppSelector(selectHeaderHeight);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (headerHeight === 0) {
      if (HeaderElement.current) {
        const height = HeaderElement.current.getBoundingClientRect().height;
        dispatch(getHeight(height));
      }
    }
  }, [dispatch, user, headerHeight]);

  return (
    <>
      {
        <header
          ref={HeaderElement}
          className={`flex items-center justify-between py-[1vh] px-[2vw]
                ${user && "shadow-md"}    
            `}
        >
          <Logo />
          {<LoginLinkButton />}
        </header>
      }
    </>
  );
}

export default HeaderClient;
