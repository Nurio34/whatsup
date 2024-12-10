import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { TbSend2 } from "react-icons/tb";
import { MediaPreviewType } from "../../..";
import { AxiosResponse } from "axios";

function ActionButton({
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
  const sendMessage = async () => {
    const response = await send();
    if (response?.data.status !== "success") {
      toast.error("Failed to send media message.");
    } else {
      setMessage("");
      setMediaFiles([]);
      setMediaPreview([]);
    }
  };

  return (
    <button
      onClick={sendMessage}
      className=" transition-all hover:scale-110 active:scale-95 grid place-content-center"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <TbSend2 size={20} />
      )}
    </button>
  );
}

export default ActionButton;
