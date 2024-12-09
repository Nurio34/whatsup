import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import { selectUser } from "@/store/slices/user";
import { Dispatch, SetStateAction } from "react";
import { TbSend2 } from "react-icons/tb";
import { useSendMessage } from "../../useSendMessage";
import { PiTimerBold } from "react-icons/pi";

function ActionButton({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const user = useAppSelector(selectUser);

  const selectedConnection = useAppSelector(selectSelectedConnection);

  const { isLoading, send } = useSendMessage(
    user!.id,
    selectedConnection!._id,
    message
  );

  const sendMessage = async () => {
    if (Boolean(message)) {
      const response = await send();
      if (response?.data.status === "success") {
        setMessage("");
      }
    }
  };

  return (
    <button
      onClick={sendMessage}
      className=" transition-all hover:scale-110 active:scale-95"
    >
      {isLoading ? <PiTimerBold size={20} /> : <TbSend2 size={20} />}
    </button>
  );
}

export default ActionButton;
