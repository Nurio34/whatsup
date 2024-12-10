import { ChatType, MessageType } from "@/type/message";
import { time } from "@/utils/time";
import React from "react";
import MessageStatus from "./MessageStatus";

function Text({
  chatOfSelectedConnection,
  index,
  LastMessageElement,
  userId,
  message,
  shapeOfContainer,
  MessageElement,
}: {
  chatOfSelectedConnection: ChatType;
  index: number;
  LastMessageElement: React.MutableRefObject<HTMLDivElement | null>;
  userId: string;
  message: MessageType;
  shapeOfContainer: number;
  MessageElement: React.MutableRefObject<HTMLParagraphElement | null>;
}) {
  return (
    <div
      ref={
        chatOfSelectedConnection.messages.length - 1 === index
          ? LastMessageElement
          : null
      }
      className={`justify-self-stretch rounded-md py-1  max-w-56 md:max-w-96 
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
          <span className=" inline-block w-8 h-4 "></span>
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
    </div>
  );
}

export default Text;
