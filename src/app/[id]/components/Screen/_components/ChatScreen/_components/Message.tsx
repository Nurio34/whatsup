import { ChatType, MessageType } from "@/type/message";
import { useEffect, useRef, useState } from "react";
import TextMessage from "./TextMessage";
import MediaMessage from "./MediaMessage";

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
    <>
      {message.medias.length !== 0 ? (
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
    </>
  );
}

export default Message;
