"use server";

import axiosInstance from "@/axios";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieHeader = (await cookies()).toString(); // Get all cookies as a string

  try {
    const response = await axiosInstance.get(`/user/get-user`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (response.data.status === "success") {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
  }
};
