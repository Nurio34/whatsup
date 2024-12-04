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
  const [shapeOfContainer, setShapeOfContainer] = useState(1);
  console.log({ shapeOfContainer });

  useEffect(() => {
    if (MessageElement.current) {
      const heightOfMessageElement =
        MessageElement.current.getBoundingClientRect().height;
      console.log({ heightOfMessageElement });

      setShapeOfContainer(heightOfMessageElement <= 29 ? 1 : 2);
    }
  }, []);

  return (
    <li
      className={` rounded-md py-1 px-[1vw] ${
        userId === message.senderId
          ? "justify-self-end bg-green-200"
          : "justify-self-start bg-blue-200"
      }
      ${shapeOfContainer === 1 ? "flex gap-x-[1vh]" : ""}
      `}
    >
      <p
        ref={MessageElement}
        className={`${shapeOfContainer === 1 ? "" : "float-left"}`}
      >
        {message.message}
      </p>
      <p
        className={` text-xs text-gray-500 font-bold ${
          shapeOfContainer === 1 ? "pt-3" : " float-right"
        }`}
      >
        {time(message.createdAt)}
      </p>
    </li>
  );
}

export default Message;
