import { ChatType, MessageType } from "@/type/message";
import { time } from "@/utils/time";
import React from "react";
import MessageStatus from "./MessageStatus";
import ContextMenu from "../ContextMenu";
import { useChatScreenContext } from "../../Context";

function Text({
  chatOfSelectedConnection,
  index,
  LastMessageElement,
  message,
  shapeOfContainer,
  MessageElement,
  userId,
}: {
  chatOfSelectedConnection: ChatType;
  index: number;
  LastMessageElement: React.MutableRefObject<HTMLDivElement | null>;
  message: MessageType;
  shapeOfContainer: number;
  MessageElement: React.MutableRefObject<HTMLParagraphElement | null>;
  userId: string;
}) {
  const { rightClickedMessage } = useChatScreenContext();

  return (
    <div
      ref={
        chatOfSelectedConnection.messages.length - 1 === index
          ? LastMessageElement
          : null
      }
      className={`justify-self-stretch rounded-md py-1 px-[1vw]  max-w-56 md:max-w-96 
         ${
           userId === message.senderId
             ? "justify-self-end bg-[rgba(220,252,231,0.5)] justify-items-end "
             : " justify-self-start bg-[rgba(219,234,254,0.5)] justify-items-start "
         }
        ${
          shapeOfContainer === 1
            ? "flex gap-x-[1vh] justify-between"
            : " relative"
        }
    `}
    >
      <p ref={MessageElement} className={`${shapeOfContainer === 1 ? "" : ""}`}>
        {message.message}
        {shapeOfContainer === 2 && (
          <span className=" inline-block w-14 h-4 "></span>
        )}
      </p>
      <p
        className={` text-xs text-gray-500 font-bold flex gap-x-1 items-center ${
          shapeOfContainer === 1 ? "pt-3" : " absolute right-[1vw] bottom-1"
        }`}
      >
        <span>{time(message.createdAt)}</span>
        <MessageStatus status={message.status} senderId={message.senderId} />
      </p>
      {rightClickedMessage._id === message._id && <ContextMenu />}
    </div>
  );
}

export default Text;
