"use server";

import axiosInstance from "@/axios";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/user/get-all-users");

    if (response.data.status === "success") {
      return response.data.users;
    }
  } catch (error) {
    console.log(error);
  }
};
