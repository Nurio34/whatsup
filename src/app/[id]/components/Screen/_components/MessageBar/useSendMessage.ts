import axiosInstance from "@/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SendReturnType = any;

export const useSendMessage = (
  userId: string,
  reciverId: string,
  message: string
) => {
  const [isLoading, setIsLoading] = useState(false);

  const send = async (): Promise<SendReturnType> => {
    setIsLoading(true);

    try {
      const response: SendReturnType = await axiosInstance.post(
        "/chat/send-message",
        {
          senderId: userId,
          reciverId: reciverId,
          message,
          type: "text",
        }
      );

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
