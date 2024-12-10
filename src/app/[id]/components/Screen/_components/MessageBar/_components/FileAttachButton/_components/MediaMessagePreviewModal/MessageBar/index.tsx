import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { Dispatch, SetStateAction } from "react";
import EmojiButton from "./EmojiButton";
import MessageInput from "./MessageInput";
import ActionButton from "./ActionButton";
import { MediaPreviewType } from "../../..";
import { SendReturnType } from "../../../../../useSendMessage";

function MessageBar({
  message,
  setMessage,
  setMediaFiles,
  setMediaPreview,
  isLoading,
  send,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setMediaPreview: React.Dispatch<React.SetStateAction<MediaPreviewType[]>>;
  isLoading: boolean;
  send: () => Promise<SendReturnType>;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  return (
    <div className=" flex gap-x-[1vw] pt-[1vh]">
      {!isMobile && (
        <EmojiButton setMessage={setMessage} isLoading={isLoading} />
      )}
      <MessageInput
        message={message}
        setMessage={setMessage}
        setMediaFiles={setMediaFiles}
        setMediaPreview={setMediaPreview}
        isLoading={isLoading}
        send={send}
      />
      <ActionButton
        setMessage={setMessage}
        setMediaFiles={setMediaFiles}
        setMediaPreview={setMediaPreview}
        isLoading={isLoading}
        send={send}
      />
    </div>
  );
}

export default MessageBar;
