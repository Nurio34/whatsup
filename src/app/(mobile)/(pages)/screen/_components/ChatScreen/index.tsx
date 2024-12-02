import { useEffect, useState } from "react";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/user";
import { getChat, selectChat } from "@/store/slices/chat";
import Loading from "@/app/components/Loading";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ChatsUserType } from "@/app/[id]/components/Menu/Chats";

function ChatScreen({
  selectedConnection,
}: {
  selectedConnection: ChatsUserType;
}) {
  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const connectionId = selectedConnection._id;

  const chat = useAppSelector(selectChat);
  const chatOfSelectedConnection = chat.find(
    (item) => item.connectionId === connectionId
  );

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getChatOfSelectedConnection = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          `/chat/get-chat/${userId}/${connectionId}`
        );

        if (response.data.status === "success") {
          dispatch(getChat(response.data.chat));
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!Boolean(chatOfSelectedConnection)) {
      getChatOfSelectedConnection();
    }
  }, [connectionId, userId, dispatch]);

  if (isLoading) {
    return (
      <div
        className="w-full h-full"
        style={{
          backgroundImage: "url('/chat-bg.jpg')",
        }}
      >
        <Loading message="Chat" />
      </div>
    );
  }

  return (
    <section
      className="grow"
      style={{
        backgroundImage: "url('/chat-bg.jpg')",
      }}
    >
      <ul>
        {chatOfSelectedConnection?.messages.map((message, index) => (
          <li
            key={index}
            className={`${
              message.senderId === userId ? "text-left" : "text-right"
            }`}
          >
            {message.message}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ChatScreen;
