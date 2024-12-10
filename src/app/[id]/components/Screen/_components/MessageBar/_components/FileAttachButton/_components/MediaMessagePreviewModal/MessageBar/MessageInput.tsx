import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import toast from "react-hot-toast";
import { MediaPreviewType } from "../../..";
import { AxiosResponse } from "axios";

function MessageInput({
  message,
  setMessage,
  mediaFiles,
  setMediaFiles,
  setMediaPreview,
  isLoading,
  send,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  mediaFiles: File[];
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  setMediaPreview: React.Dispatch<React.SetStateAction<MediaPreviewType[]>>;
  isLoading: boolean;
  send: () => Promise<AxiosResponse<any, any> | undefined>;
}) {
  const sendMessage = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isLoading) {
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
      value={isLoading ? "Sending.." : message}
    ></textarea>
  );
}

export default MessageInput;
