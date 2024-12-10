import { Dispatch, SetStateAction } from "react";
import { TbSend2 } from "react-icons/tb";
import { PiTimerBold } from "react-icons/pi";
import { SendReturnType } from "../../useSendMessage";

function ActionButton({
  message,
  setMessage,
  isLoading,
  send,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  send: () => Promise<SendReturnType>;
}) {
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
