"use client";

import { useAppSelector } from "@/store/hooks";
import BackgroundImage from "./components/BackgroundImage";
import Main from "./components/Main";
import { selectToken, selectUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomeUnauthClient() {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${user.username}?token=${token}`);
    }
  }, [user, router]);

  return (
    <>
      {!user && (
        <div className=" text-white">
          <BackgroundImage />
          <Main />
        </div>
      )}
    </>
  );
}

export default HomeUnauthClient;
