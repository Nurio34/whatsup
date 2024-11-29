import axiosInstance from "@/axios";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import { selectUser } from "@/store/slices/user";
import { AxiosError } from "axios";
import { TbSend2 } from "react-icons/tb";

function ActionButton({ message }: { message: string }) {
  const user = useAppSelector(selectUser);
  const selectedConnection = useAppSelector(selectSelectedConnection);

  const sendMessage = async () => {
    try {
      const response = await axiosInstance.post("/chat/send-message", {
        senderId: user?.id,
        reciverId: selectedConnection?._id,
        message,
        type: "text",
      });
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
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
