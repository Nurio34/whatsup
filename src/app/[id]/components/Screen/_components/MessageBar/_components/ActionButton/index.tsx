import axiosInstance from "@/axios";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import { selectUser } from "@/store/slices/user";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { TbSend2 } from "react-icons/tb";

function ActionButton({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const user = useAppSelector(selectUser);

  const selectedConnection = useAppSelector(selectSelectedConnection);

  const sendMessage = async () => {
    //! *** SAVE MESSAGE TO DATABASE ***
    try {
      const response = await axiosInstance.post("/chat/send-message", {
        senderId: user!.id,
        reciverId: selectedConnection!._id,
        message,
        type: "text",
      });

      if (response.data.status === "success") {
        setMessage("");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
    //! *******************************
  };

  return (
    <button
      onClick={Boolean(message) ? sendMessage : undefined}
      className=" transition-all hover:scale-110 active:scale-95"
    >
      <TbSend2 size={20} />
    </button>
  );
}

export default ActionButton;
