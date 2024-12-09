import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import { selectUser } from "@/store/slices/user";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { TbSend2 } from "react-icons/tb";
import { useSendMediaMessage } from "../../../hooks/useSendMediaMessage";
import { MediaPreviewType } from "../../..";

function ActionButton({
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
