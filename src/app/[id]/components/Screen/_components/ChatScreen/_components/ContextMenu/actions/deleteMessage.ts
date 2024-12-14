import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { MessageType } from "@/type/message";
import axiosInstance from "@/axios";
import { Dispatch, SetStateAction } from "react";

export const deleteMessage = async (
  message: MessageType,
  userId: string | undefined,
  connectionId: string | undefined,
  socketState: Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
  setIsDeleteLoading: Dispatch<SetStateAction<boolean>>
) => {
  const messageId = message._id;

  if (userId && message.senderId === userId) {
    setIsDeleteLoading(true);

    try {
      const response = await axiosInstance.delete(`/chat/delete-message`, {
        data: message,
      });

      if (response.data.status === "success") {
        if (socketState && userId && connectionId) {
          socketState?.emit("delete-message", {
            messageId,
            userId,
            connectionId,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  }
};
