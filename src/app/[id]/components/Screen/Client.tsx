"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ChatScreen from "./_components/ChatScreen";
import Header from "./_components/Header";
import MessageBar from "./_components/MessageBar";
import {
  deleteMessage,
  messageSeen,
  saveSentMessage,
  selectSelectedConnection,
} from "@/store/slices/chat";
import WelcomeScreen from "./_components/WelcomeScreen";
import {
  addToConnectWith,
  selectConnectWith,
  selectIsMoile,
  selectUser,
  setStatus,
} from "@/store/slices/user";
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
  const connectWith = useAppSelector(selectConnectWith);

  const dispatch = useAppDispatch();

  const [socketState, setSocketState] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >(undefined);

  useEffect(() => {
    if (userId && !socketState) {
      const socket = io(process.env.NEXT_PUBLIC_SERVER_SOCKET_URL);

      socket.on("connect", () => {
        console.log("Socket connected !");

        socket.emit("add-user", userId);
        setSocketState(socket);
      });
    }

    return () => {
      if (socketState) {
        console.log("Socket disconnected !");

        socketState.disconnect();
        setSocketState(undefined);
      }
    };
  }, [userId, socketState]);

  useEffect(() => {
    if (socketState) {
      const handleMessage = (message: MessageType) => {
        console.log("New message !");

        //! *** CHECK IF MESSAGE COME FROM A  NON-CONNECTION USER ***
        const nonConnectionUserId =
          message.senderId !== userId ? message.senderId : null;
        if (nonConnectionUserId) {
          if (!connectWith?.includes(nonConnectionUserId)) {
            dispatch(addToConnectWith(nonConnectionUserId));
          }
        }
        //! *********************************************************

        if (selectedConnection) {
          const connectionId =
            message.senderId === userId
              ? selectedConnection._id
              : message.senderId;

          dispatch(saveSentMessage({ connectionId, message }));

          if (message.senderId === selectedConnection._id) {
            const messagesSeen = async (
              userId: string,
              connectionId: string
            ) => {
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
        }
      };

      socketState.on("new-message", handleMessage);

      return () => {
        socketState.off("new-message", handleMessage);
      };
    }
  }, [socketState, selectedConnection, userId, dispatch, connectWith]);

  useEffect(() => {
    if (socketState) {
      socketState.on("message-seen", (message: MessageType) => {
        dispatch(messageSeen(message));
      });
    }
  }, [socketState]);

  useEffect(() => {
    if (socketState) {
      socketState.on("delete-message", (data) => {
        const connectionId =
          userId === data.userId ? data.connectionId : data.userId;
        dispatch(deleteMessage({ connectionId, messageId: data.messageId }));
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
          <ChatScreen
            selectedConnection={selectedConnection}
            socketState={socketState}
          />
          <MessageBar />
        </div>
      ) : (
        <WelcomeScreen />
      )}
    </section>
  );
}

export default ScreenClient;
