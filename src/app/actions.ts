"use server";

import axiosInstance from "@/axios";
import { AxiosError } from "axios";

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");

    if (response.data.status === "success") {
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("AxiosError", error);
      return;
    }
    console.log("DefaultError", error);
  }
};
