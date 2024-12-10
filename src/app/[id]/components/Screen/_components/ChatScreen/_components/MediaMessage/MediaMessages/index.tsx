import { ChatType, MessageType } from "@/type/message";
import Media from "./Media";
import Text from "../Text";

function MediaMessages({
  message,
  LastMessageElement,
  userId,
  chatOfSelectedConnection,
  shapeOfContainer,
  MessageElement,
}: {
  message: MessageType;
  LastMessageElement: React.MutableRefObject<HTMLDivElement | null>;
  userId: string;
  chatOfSelectedConnection: ChatType;
  shapeOfContainer: number;
  MessageElement: React.MutableRefObject<HTMLParagraphElement | null>;
}) {
  return message.medias.map((media, index) => {
    const aspectRatio =
      media.width && media.height ? media.width / media.height : undefined;

    return (
      <div
        key={media.asset_id}
        ref={LastMessageElement}
        className={` rounded-md py-1 px-[1vw] mb-[1vh] grid   ${
          userId === message.senderId
            ? "justify-self-end bg-[rgba(220,252,231,0.5)] justify-items-end "
            : "justify-self-start  bg-[rgba(219,234,254,0.5)] justify-items-start "
        }
  `}
      >
        <Media media={media} aspectRatio={aspectRatio} message={message} />
        {index === message.medias.length - 1 && (
          <Text
            chatOfSelectedConnection={chatOfSelectedConnection}
            index={index}
            LastMessageElement={LastMessageElement}
            userId={userId}
            message={message}
            shapeOfContainer={shapeOfContainer}
            MessageElement={MessageElement}
          />
        )}
      </div>
    );
  });
}

export default MediaMessages;
