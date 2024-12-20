import { ChatType, MessageType } from "@/type/message";
import { MutableRefObject } from "react";
import MessageStatus from "./MessageStatus";
import { time } from "@/utils/time";
import { useChatScreenContext } from "../../Context";
import ContextMenu from "../ContextMenu";

function TextMessage({
  message,
  userId,
  chatOfSelectedConnection,
  LastMessageElement,
  index,
  shapeOfContainer,
  MessageElement,
}: {
  message: MessageType;
  userId: string;
  chatOfSelectedConnection: ChatType;
  LastMessageElement: MutableRefObject<HTMLDivElement | null>;
  index: number;
  shapeOfContainer: number;
  MessageElement: MutableRefObject<HTMLParagraphElement | null>;
}) {
  const { rightClickedMessage, handleContextMenu } = useChatScreenContext();

  return (
    <div
      onContextMenu={(e) => handleContextMenu(e, message)}
      ref={
        chatOfSelectedConnection.messages.length - 1 === index
          ? LastMessageElement
          : null
      }
      className={` rounded-md py-1 px-[1vw] max-w-56 md:max-w-96 ${
        userId === message.senderId
          ? "justify-self-end bg-[rgba(220,252,231,0.5)]"
          : "justify-self-start bg-[rgba(219,234,254,0.5)]"
      }
  ${shapeOfContainer === 1 ? "flex gap-x-[1vh]" : " relative"}
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

export default TextMessage;
