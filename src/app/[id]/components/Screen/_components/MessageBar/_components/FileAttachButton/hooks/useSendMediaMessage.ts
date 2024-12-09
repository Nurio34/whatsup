import axiosInstance from "@/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSendMediaMessage = (
  userId: string,
  reciverId: string,
  message: string,
  mediaFiles: File[]
) => {
  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    if (!userId || !reciverId || mediaFiles.length === 0) {
      toast.error("Invalid data. Please try again.");
      return;
    }

    setIsLoading(true);

    const form = new FormData();
    form.append("userId", userId);
    form.append("reciverId", reciverId);
    form.append("message", message);
    mediaFiles.forEach((file) => {
      form.append(`files`, file);
    });

    try {
      const response = await axiosInstance.post(
        "/chat/send-media-message",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, send };
};
