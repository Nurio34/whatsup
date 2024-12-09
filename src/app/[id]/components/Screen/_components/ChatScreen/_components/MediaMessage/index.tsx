import { ChatType, MessageType } from "@/type/message";
import Image from "next/image";
import React, { MutableRefObject } from "react";
import TextMessage from "../TextMessage";
import Text from "./Text";

function MediaMessage({
  message,
  userId,
  shapeOfContainer,
  chatOfSelectedConnection,
  LastMessageElement,
  index,
  MessageElement,
}: {
  message: MessageType;
  userId: string;
  shapeOfContainer: number;
  chatOfSelectedConnection: ChatType;
  LastMessageElement: MutableRefObject<HTMLDivElement | null>;
  index: number;
  MessageElement: MutableRefObject<HTMLParagraphElement | null>;
}) {
  return (
    message.medias.length <= 3 &&
    message.medias.map((media) => {
      const aspectRatio =
        media.width && media.height ? media.width / media.height : undefined;

      return (
        <div
          key={media.asset_id}
          ref={LastMessageElement}
          className={` rounded-md py-1 px-[1vw] mb-[1vh]   ${
            userId === message.senderId
              ? "justify-self-end bg-[red] "
              : "justify-self-start bg-[green] "
          }
    `}
        >
          {media.format === "jpg" && (
            <div className="min-w-40 max-w-48 relative" style={{ aspectRatio }}>
              <Image
                src={media.url}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt="image"
              />
            </div>
          )}
          {media.format === "mp4" && (
            <video
              src={media.url}
              className={`${message.message ? " max-w-48" : "w-40"}`}
              style={{ aspectRatio }}
              controls
            >
              Video
            </video>
          )}
          {media.format === "mp3" && <audio src={media.url} controls></audio>}
          <Text
            chatOfSelectedConnection={chatOfSelectedConnection}
            index={index}
            LastMessageElement={LastMessageElement}
            userId={userId}
            message={message}
            shapeOfContainer={shapeOfContainer}
            MessageElement={MessageElement}
          />
        </div>
      );
    })
  );
}

export default MediaMessage;
