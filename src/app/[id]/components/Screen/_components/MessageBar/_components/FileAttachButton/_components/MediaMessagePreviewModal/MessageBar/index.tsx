import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { Dispatch, SetStateAction } from "react";
import EmojiButton from "./EmojiButton";
import MessageInput from "./MessageInput";
import ActionButton from "./ActionButton";
import { MediaPreviewType } from "../../..";

function MessageBar({
  message,
  setMessage,
  mediaFiles,
  setMediaFiles,
  setMediaPreview,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  mediaFiles: File[];
  setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setMediaPreview: React.Dispatch<React.SetStateAction<MediaPreviewType[]>>;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  return (
    <div className=" flex gap-x-[1vw] pt-[1vh]">
      {!isMobile && <EmojiButton setMessage={setMessage} />}
      <MessageInput
        message={message}
        setMessage={setMessage}
        mediaFiles={mediaFiles}
        setMediaFiles={setMediaFiles}
        setMediaPreview={setMediaPreview}
      />
      <ActionButton
        message={message}
        setMessage={setMessage}
        mediaFiles={mediaFiles}
        setMediaFiles={setMediaFiles}
        setMediaPreview={setMediaPreview}
      />
    </div>
  );
}

export default MessageBar;
