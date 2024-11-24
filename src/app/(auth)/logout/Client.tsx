"use client";

import axiosInstance from "@/axios";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LogoutClient() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axiosInstance.post("/auth/logout");

        if (response.data.status === "success") {
          dispatch(logoutUser());
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    logout();
  }, []);

  return <div>LogoutClient</div>;
}

export default LogoutClient;
