import { ChatType, MessageType } from "@/type/message";
import Text from "../Text";
import Media from "./Media";
import { useChatScreenContext } from "../../../Context";

function MediaPack({
  message,
  chatOfSelectedConnection,
  index,
  LastMessageElement,
  userId,
  shapeOfContainer,
  MessageElement,
}: {
  message: MessageType;
  chatOfSelectedConnection: ChatType;
  index: number;
  LastMessageElement: React.MutableRefObject<HTMLDivElement | null>;
  userId: string;
  shapeOfContainer: number;
  MessageElement: React.MutableRefObject<HTMLParagraphElement | null>;
}) {
  const { handleContextMenu } = useChatScreenContext();
  return (
    <div
      className={`w-64 md:w-80 aspect-square pt-[1vw] px-[1vw] rounded-lg 
        ${
          userId === message.senderId
            ? "justify-self-end bg-[rgba(220,252,231,0.5)]"
            : "justify-self-start bg-[rgba(219,234,254,0.5)]"
        }
      `}
      onContextMenu={(e) => handleContextMenu(e, message)}
    >
      <ul className="  h-full grid grid-cols-2 grid-rows-2 gap-[1vw] relative">
        {message.medias
          .filter((_, ind) => ind <= 3)
          .map((media) => {
            const aspectRatio =
              media.width && media.height
                ? media.width / media.height
                : undefined;
            return (
              <li
                key={media.asset_id}
                className="rounded-md overflow-hidden relative
                "
              >
                <Media
                  media={media}
                  aspectRatio={aspectRatio}
                  message={message}
                />
              </li>
            );
          })}
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square rounded-full bg-white grid place-content-center text-4xl font-semibold ">
          {message.medias.length}
        </div>
      </ul>
      <Text
        chatOfSelectedConnection={chatOfSelectedConnection}
        index={index}
        LastMessageElement={LastMessageElement}
        message={message}
        shapeOfContainer={shapeOfContainer}
        MessageElement={MessageElement}
        userId={userId}
      />
    </div>
  );
}

export default MediaPack;
