"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ChatScreen from "./_components/ChatScreen";
import Header from "./_components/Header";
import MessageBar from "./_components/MessageBar";
import {
  messageSeen,
  saveSentMessage,
  selectSelectedConnection,
} from "@/store/slices/chat";
import WelcomeScreen from "./_components/WelcomeScreen";
import { selectIsMoile, selectUser, setStatus } from "@/store/slices/user";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { MessageType } from "@/type/message";
import { selectRenderedComponent } from "@/store/slices/components";
import axiosInstance from "@/axios";

function ScreenClient() {
  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const selectedConnection = useAppSelector(selectSelectedConnection);
  const isMobile = useAppSelector(selectIsMoile);
  const renderedComponent = useAppSelector(selectRenderedComponent);

  const dispatch = useAppDispatch();

  const [socketState, setSocketState] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >(undefined);

  useEffect(() => {
    if (userId && !socketState) {
      const socket = io(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL);

      socket.on("connect", () => {
        socket.emit("add-user", userId);
        setSocketState(socket);
      });
    }

    return () => {
      if (socketState) {
        socketState.disconnect();
        setSocketState(undefined);
      }
    };
  }, [userId, socketState]);

  useEffect(() => {
    if (socketState && selectedConnection) {
      const handleMessage = (message: MessageType) => {
        const connectionId =
          message.senderId === userId
            ? selectedConnection._id
            : message.senderId;

        dispatch(saveSentMessage({ connectionId, message }));

        if (message.senderId === selectedConnection._id) {
          const messagesSeen = async (userId: string, connectionId: string) => {
            console.log("messageSeen function");

            try {
              await axiosInstance(
                `/chat/messages-seen/${userId}/${connectionId}`
              );
            } catch (error) {
              console.log(error);
            }
          };

          messagesSeen(userId!, selectedConnection._id);
        }
      };

      // Add the event listener
      socketState.on("new-message", handleMessage);

      // Clean up the listener when selectedConnection changes
      return () => {
        socketState.off("new-message", handleMessage);
      };
    }
  }, [socketState, selectedConnection, userId, dispatch]);

  useEffect(() => {
    if (socketState) {
      socketState.on("message-seen", (message: MessageType) => {
        dispatch(messageSeen(message));
      });
    }
  }, [socketState]);

  useEffect(() => {
    if (socketState) {
      const updateStatusOnline = async () => {
        try {
          const response = await axiosInstance.patch(
            `/user/update-status-online/${userId}`
          );
          if (response.data.status === "success") {
            dispatch(setStatus(response.data.userStatus));
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (user && user.status === "offline") {
        updateStatusOnline();
      }
    }
    //TODO : USER'A WATCHER KOYUP ONLINE-OFFLINE STATUS TAKIP ET
  }, [user, socketState]);

  const mobileCondition =
    (isMobile && renderedComponent === "screen") || !isMobile;

  return (
    <section className={`grow ${!mobileCondition && "hidden"}`}>
      {selectedConnection ? (
        <div className={`w-full h-screen flex flex-col`}>
          <Header selectedConnection={selectedConnection} />
          <ChatScreen selectedConnection={selectedConnection} />
          <MessageBar />
        </div>
      ) : (
        <WelcomeScreen />
      )}
    </section>
  );
}

export default ScreenClient;
