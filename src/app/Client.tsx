"use client";

import { useAppSelector } from "@/store/hooks";
import BackgroundImage from "./components/BackgroundImage";
import Main from "./components/Main";
import { selectUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomeUnauthClient() {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  console.log(user);

  console.log({ user });

  useEffect(() => {
    if (user) {
      router.push(`/${user.id}`);
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
