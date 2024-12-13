import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { MessageType } from "@/type/message";
import axiosInstance from "@/axios";

export const deleteMessage = async (
  message: MessageType,
  userId: string | undefined,
  connectionId: string | undefined,
  socketState: Socket<DefaultEventsMap, DefaultEventsMap> | undefined
) => {
  const messageId = message._id;

  if (userId && message.senderId === userId) {
    try {
      const response = await axiosInstance.delete(
        `/chat/delete-message/${messageId}`
      );

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
    }
  }
};
