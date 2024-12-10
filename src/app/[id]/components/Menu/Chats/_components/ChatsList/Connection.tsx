import { useEffect, useState } from "react";
import axiosInstance from "@/axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getChat,
  saveLostMessages,
  selectChat,
  selectSelectedConnection,
  setSelectedConnection,
} from "@/store/slices/chat";
import { addToContacts, selectContacts, selectUser } from "@/store/slices/user";
import { setRenderedComponent } from "@/store/slices/components";

function Connection({ connectionId }: { connectionId: string }) {
  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const contacts = useAppSelector(selectContacts);

  const thisContact = contacts.find(
    (connection) => connection._id === connectionId
  );

  const selectedConnection = useAppSelector(selectSelectedConnection);

  const chat = useAppSelector(selectChat);
  const currentChat = chat.find((item) => item.connectionId === connectionId);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [isSecondAnimation, setIsSecondAnimation] = useState(false);
  const [isThirdAnimation, setIsThirdAnimation] = useState(false);

  useEffect(() => {
    const getConnection = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance(
          `/contact/getConnection/${connectionId}`
        );

        if (response.data.status === "success") {
          dispatch(addToContacts(response.data.connection));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!Boolean(thisContact) && connectionId !== "") {
      getConnection();
    }
  }, [connectionId, thisContact, dispatch]);

  useEffect(() => {
    const getChatOfConnection = async (
      userId: string,
      connectionId: string
    ) => {
      try {
        const response = await axiosInstance.get(
          `/chat/get-chat/${userId}/${connectionId}`
        );

        if (response.data.status === "success") {
          dispatch(getChat(response.data.chat));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId && connectionId && !currentChat)
      getChatOfConnection(userId, connectionId);
  }, [userId, connectionId]);

  useEffect(() => {
    if (selectedConnection?._id === connectionId) {
      const currentChatTotalMesagesOfConnection = currentChat?.messages.filter(
        (message) => message.senderId === connectionId
      ).length;

      const fetchLostMessages = async () => {
        try {
          const response = await axiosInstance.post(
            `/chat/fetch-lost-messages/${userId}/${connectionId}`,
            { totalMessages: currentChatTotalMesagesOfConnection }
          );
          if (response.data.status === "success") {
            dispatch(
              saveLostMessages({
                connectionId,
                messages: response.data.messages,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchLostMessages();
    }
  }, [selectedConnection]);

  useEffect(() => {
    const messagesDelivered = async (userId: string, connectionId: string) => {
      try {
        await axiosInstance(
          `/chat/messages-delivered/${userId}/${connectionId}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (userId && connectionId) {
      messagesDelivered(userId, connectionId);
    }
  }, [userId, connectionId]);

  const handleSelectConnection = () => {
    if (thisContact) {
      dispatch(setSelectedConnection(thisContact));
      dispatch(setRenderedComponent("screen"));
    }

    const messagesSeen = async (userId: string, connectionId: string) => {
      try {
        await axiosInstance(`/chat/messages-seen/${userId}/${connectionId}`);
      } catch (error) {
        console.log(error);
      }
    };

    if (connectionId !== selectedConnection?._id) {
      messagesSeen(userId!, connectionId);
    }
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <>
      {thisContact && (
        <motion.li
          className=" bg-gray-100 border-2 shadow-md  rounded-md px-[1vw] py-[1vh]"
          initial={{ x: "-5%", opacity: 0 }}
          animate={
            !isSecondAnimation
              ? { x: "0%", opacity: 1 }
              : isSecondAnimation && !isThirdAnimation
              ? {
                  x: "0%",
                  opacity: 1,
                  filter: "drop-shadow(0 0 6px blue) ",
                  transition: { type: "tween", ease: "easeOut" },
                }
              : {
                  x: "0%",
                  opacity: 1,
                  filter: "drop-shadow(0 0 0 transparent)",
                  transition: { type: "tween", duration: 1.6 },
                }
          }
          onAnimationComplete={() => {
            if (!isSecondAnimation) {
              setIsSecondAnimation(true);
            } else if (isSecondAnimation && !isThirdAnimation) {
              setIsSecondAnimation(false);
              setIsThirdAnimation(true);
            } else {
              return;
            }
          }}
        >
          <button
            type="button"
            className="flex items-center  gap-x-[1vw] w-full"
            onClick={handleSelectConnection}
          >
            <figure className=" relative min-w-20 aspect-square rounded-full overflow-hidden">
              <Image
                src={thisContact.avatar.url}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={`Avatar of ${thisContact.username}`}
                priority
              />
            </figure>
            <div className="grow grid justify-items-start">
              <p className=" font-semibold text-lg text-gray-800">
                {thisContact.username}
              </p>
              <p className=" truncate text-sm text-gray-500">
                {thisContact.about || `Hey it's ${thisContact.username} `}
              </p>
            </div>
          </button>
        </motion.li>
      )}
    </>
  );
}

export default Connection;
