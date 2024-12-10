import { ChatType, MessageType } from "@/type/message";
import React, { MutableRefObject } from "react";
import MediaPack from "./MediaPack";
import MediaMessages from "./MediaMessages";

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
    <div>
      {message.medias.length <= 3 ? (
        <MediaMessages
          message={message}
          LastMessageElement={LastMessageElement}
          userId={userId}
          chatOfSelectedConnection={chatOfSelectedConnection}
          shapeOfContainer={shapeOfContainer}
          MessageElement={MessageElement}
        />
      ) : (
        <MediaPack
          message={message}
          chatOfSelectedConnection={chatOfSelectedConnection}
          index={index}
          LastMessageElement={LastMessageElement}
          userId={userId}
          shapeOfContainer={shapeOfContainer}
          MessageElement={MessageElement}
        />
      )}
    </div>
  );
}

export default MediaMessage;
