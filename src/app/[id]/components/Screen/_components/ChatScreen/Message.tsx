import { MessageType } from "@/type/message";
import { time } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

function Message({
  message,
  userId,
}: {
  message: MessageType;
  userId: string;
}) {
  const MessageElement = useRef<HTMLParagraphElement | null>(null);
  const TimeElemenet = useRef<HTMLParagraphElement | null>(null);
  const [shapeOfMessageContainer, setShapeOfMessageContainer] =
    useState<number>(1);
  console.log({ shapeOfMessageContainer });

  useEffect(() => {
    if (MessageElement.current && TimeElemenet.current) {
      const heightOfMessage =
        MessageElement.current.getBoundingClientRect().height;
      const heightOfTime = TimeElemenet.current.getBoundingClientRect().height;

      setShapeOfMessageContainer(heightOfMessage === heightOfTime ? 1 : 2);
    }
  }, []);

  return (
    <li
      className={`py-1 px-[1vw] rounded-md
        ${
          message.senderId === userId
            ? "justify-self-end bg-green-100"
            : "justify-self-start bg-blue-100"
        }
        ${shapeOfMessageContainer === 1 ? "flex gap-[1vw] h-[150%]" : ""}
      `}
    >
      <p ref={MessageElement}>{message.message}</p>
      <p
        ref={TimeElemenet}
        className={` ${
          shapeOfMessageContainer === 1 ? "flex items-end text-sm" : ""
        } `}
      >
        {time(message.createdAt)}
      </p>
    </li>
  );
}

export default Message;
