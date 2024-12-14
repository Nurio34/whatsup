import { ChatType, MessageType } from "@/type/message";
import { useEffect, useRef, useState } from "react";
import TextMessage from "./TextMessage";
import MediaMessage from "./MediaMessage";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useChatScreenContext } from "../Context";

function Message({
  index,
  message,
  userId,
  chatOfSelectedConnection,
}: {
  index: number;
  message: MessageType;
  userId: string;
  chatOfSelectedConnection: ChatType;
}) {
  const MessageElement = useRef<HTMLParagraphElement | null>(null);
  const [shapeOfContainer, setShapeOfContainer] = useState(1);
  const LastMessageElement = useRef<HTMLDivElement | null>(null);

  const { isSelectCheckboxesVisible, selectedMessages, setSelectedMessages } =
    useChatScreenContext();

  useEffect(() => {
    if (MessageElement.current) {
      const heightOfMessageElement =
        MessageElement.current.getBoundingClientRect().height;

      setShapeOfContainer(heightOfMessageElement <= 32 ? 1 : 2);
    }
  }, []);

  useEffect(() => {
    if (LastMessageElement.current) {
      LastMessageElement.current.scrollIntoView({ behavior: "instant" });
    }
  }, [message]);

  return (
    <div
      className={`${
        isSelectCheckboxesVisible ? "grid grid-cols-[auto,auto] gap-[2vw]" : ""
      }
      ${userId === message.senderId ? "justify-between" : "justify-start"}
      ${
        selectedMessages.some((msg) => msg._id === message._id)
          ? "bg-red-200"
          : ""
      }
    `}
      onClick={() => {
        if (isSelectCheckboxesVisible) {
          if (selectedMessages.some((msg) => msg._id === message._id)) {
            setSelectedMessages((pre) => {
              return pre.filter((msg) => msg._id !== message._id);
            });
          } else {
            setSelectedMessages((pre) => [...pre, message]);
          }
        }
      }}
    >
      {isSelectCheckboxesVisible && (
        <button type="button" className=" ml-4">
          {selectedMessages.some((msg) => msg._id === message._id) ? (
            <ImCheckboxChecked />
          ) : (
            <ImCheckboxUnchecked />
          )}
        </button>
      )}
      <div className="">
        {message.type === "media" ? (
          <MediaMessage
            message={message}
            userId={userId}
            shapeOfContainer={shapeOfContainer}
            chatOfSelectedConnection={chatOfSelectedConnection}
            LastMessageElement={LastMessageElement}
            index={index}
            MessageElement={MessageElement}
          />
        ) : (
          <TextMessage
            message={message}
            userId={userId}
            chatOfSelectedConnection={chatOfSelectedConnection}
            LastMessageElement={LastMessageElement}
            index={index}
            shapeOfContainer={shapeOfContainer}
            MessageElement={MessageElement}
          />
        )}
      </div>
    </div>
  );
}

export default Message;
