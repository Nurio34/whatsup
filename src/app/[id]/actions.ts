"use server";

import axiosInstance from "@/axios";
import { UserType } from "@/type/user";
import { redirect } from "next/navigation";

// Define a response type for the API
type GetUserResponse = {
  status: string;
  user: UserType;
  token: string;
};

export const getUser = async (
  token: string
): Promise<{ user: UserType; refreshToken: string } | null> => {
  try {
    const response = await axiosInstance.get<GetUserResponse>(
      `/user/get-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "success") {
      return { user: response.data.user, refreshToken: response.data.token };
    } else {
      throw new Error("Failed to fetch user data: Invalid response status");
    }
  } catch (error) {
    // Optional: Log the actual error for debugging
    console.error("Error fetching user data:", error);

    // Redirect if an error occurs
    redirect("/logout");
  }
};
