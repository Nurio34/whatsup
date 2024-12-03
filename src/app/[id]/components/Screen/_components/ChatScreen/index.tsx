import { useEffect, useRef, useState } from "react";
import { ChatsUserType } from "../../../Menu/Chats";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import {
  getChat,
  selectChat,
  selectSocket,
  setSocket,
} from "@/store/slices/chat";
import Loading from "@/app/components/Loading";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import SideMenuNav from "../../../SideMenu";
import Message from "./Message";
import { io, Socket } from "socket.io-client";

function ChatScreen({
  selectedConnection,
}: {
  selectedConnection: ChatsUserType;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const connectionId = selectedConnection._id;

  const chat = useAppSelector(selectChat);
  const chatOfSelectedConnection = chat.find(
    (item) => item.connectionId === connectionId
  );

  const socket = useAppSelector(selectSocket);
  console.log({ socket });

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
  }, [connectionId]);

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

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL); // Create socket instance
      socketRef.current.emit("add-user", userId); // Emit event to the server
      dispatch(setSocket(socketRef.current)); // Dispatch the socket instance to Redux
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        dispatch(setSocket(undefined)); // Reset socket in Redux
      }
    };
  }, [userId, dispatch]);

  return (
    <section
      className="grow relative"
      style={{
        backgroundImage: "url('/chat-bg.jpg')",
      }}
    >
      {isMobile && <SideMenuNav />}
      <ul className=" grid px-[2vw] py-[1vh]">
        {chatOfSelectedConnection?.messages.map((message, index) => (
          <Message key={index} message={message} userId={userId!} />
        ))}
      </ul>
    </section>
  );
}

export default ChatScreen;
