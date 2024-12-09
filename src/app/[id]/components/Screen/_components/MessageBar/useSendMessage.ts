import axiosInstance from "@/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSendMessage = (
  userId: string,
  reciverId: string,
  message: string
) => {
  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/chat/send-message", {
        senderId: userId,
        reciverId: reciverId,
        message,
        type: "text",
      });

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, send };
};
