import { ChatType, MessageType } from "@/type/message";
import { useEffect, useRef, useState } from "react";
import TextMessage from "./TextMessage";
import Image from "next/image";

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
  const LastMessageElement = useRef<HTMLLIElement | null>(null);

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
      {message.medias.length !== 0 &&
        message.medias.length <= 3 &&
        message.medias.map((media) => {
          const aspectRatio =
            media.width && media.height
              ? media.width / media.height
              : undefined;

          return (
            <li
              key={media.asset_id}
              className="w-40 relative"
              style={{ aspectRatio }}
            >
              {media.format === "jpg" && (
                <Image
                  src={media.url}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt="image"
                />
              )}
              {media.format === "mp4" && (
                <video
                  src={media.url}
                  className=" w-40"
                  style={{ aspectRatio }}
                  controls
                >
                  Video
                </video>
              )}
              {media.format === "mp3" && (
                <audio src={media.url} controls></audio>
              )}
            </li>
          );
        })}
      <TextMessage
        message={message}
        userId={userId}
        chatOfSelectedConnection={chatOfSelectedConnection}
        LastMessageElement={LastMessageElement}
        index={index}
        shapeOfContainer={shapeOfContainer}
        MessageElement={MessageElement}
      />
    </>
  );
}

export default Message;
