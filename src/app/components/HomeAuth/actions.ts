"use server";

import axiosInstance from "@/axios";

export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.post("/user/get-user", { id });

    if (response.data.status === "success") {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
  }
};
