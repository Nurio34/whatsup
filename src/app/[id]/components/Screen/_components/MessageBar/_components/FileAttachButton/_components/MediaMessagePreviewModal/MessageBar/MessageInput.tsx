import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/user";
import { selectSelectedConnection } from "@/store/slices/chat";
import { useSendMediaMessage } from "../../../hooks/useSendMediaMessage";
import toast from "react-hot-toast";
import { MediaPreviewType } from "../../..";

function MessageInput({
  message,
  setMessage,
  mediaFiles,
  setMediaFiles,
  setMediaPreview,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  mediaFiles: File[];
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  setMediaPreview: React.Dispatch<React.SetStateAction<MediaPreviewType[]>>;
}) {
  const user = useAppSelector(selectUser);
  const selectedConnection = useAppSelector(selectSelectedConnection);

  const { isLoading, send } = useSendMediaMessage(
    user!.id,
    selectedConnection!._id,
    message,
    mediaFiles
  );

  const sendMessage = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const response = await send();
      if (response?.data.status !== "success") {
        toast.error("Failed to send media message.");
      } else {
        setMessage("");
        setMediaFiles([]);
        setMediaPreview([]);
      }
    }
  };

  return (
    <textarea
      name="message"
      id="message"
      className={`grow outline-none resize-none py-1 px-[1vw] rounded-md
        ${isLoading ? " text-gray-400 text-sm font-semibold" : ""}  
      `}
      autoCorrect="off"
      rows={1}
      onChange={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
        setMessage(e.target.value);
      }}
      onKeyDown={sendMessage}
      value={isLoading ? "Sending the message ..." : message}
    ></textarea>
  );
}

export default MessageInput;
