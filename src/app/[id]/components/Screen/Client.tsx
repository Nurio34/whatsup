"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ChatScreen from "./_components/ChatScreen";
import Header from "./_components/Header";
import MessageBar from "./_components/MessageBar";
import {
  saveSentMessage,
  selectChat,
  selectSelectedConnection,
} from "@/store/slices/chat";
import WelcomeScreen from "./_components/WelcomeScreen";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { RealtimeMessageType } from "@/type/message";
import { selectRenderedComponent } from "@/store/slices/components";

function ScreenClient() {
  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const selectedConnection = useAppSelector(selectSelectedConnection);
  const isMobile = useAppSelector(selectIsMoile);
  const chat = useAppSelector(selectChat);
  console.log(chat);
  const renderedComponent = useAppSelector(selectRenderedComponent);

  const dispatch = useAppDispatch();

  const [socketState, setSocketState] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >(undefined);

  useEffect(() => {
    if (userId && !socketState) {
      const socket = io(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL);

      socket.on("connect", () => {
        socket.emit("add-user", userId); // Add user when socket connects
      });

      socket.on("get-message", (message: RealtimeMessageType) => {
        console.log({ message });

        dispatch(
          saveSentMessage({
            connectionId:
              userId === message.senderId
                ? message.reciverId
                : message.senderId,
            message: {
              type: message.type,
              message: message.message,
              status: message.status,
              senderId: message.senderId,
              createdAt: message.createdAt,
            },
          })
        );
      });

      console.log("Desktop socket connected successfully ...");
      setSocketState(socket);
    }

    // Cleanup on component unmount
    return () => {
      if (socketState) {
        socketState.disconnect();
        setSocketState(undefined);
        console.log("Desktop socket disconnected on unmount !");
      }
    };
  }, [userId, socketState, setSocketState, dispatch]);

  const mobileCondition =
    (isMobile && renderedComponent === "screen") || !isMobile;

  return (
    <section className={`grow ${!mobileCondition && "hidden"}`}>
      {selectedConnection ? (
        <div className={`w-full h-screen flex flex-col`}>
          <Header selectedConnection={selectedConnection} />
          <ChatScreen selectedConnection={selectedConnection} />
          <MessageBar socketState={socketState} />
        </div>
      ) : (
        <WelcomeScreen />
      )}
    </section>
  );
}

export default ScreenClient;
