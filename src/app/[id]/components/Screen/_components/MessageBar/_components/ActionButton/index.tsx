import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TbSend2 } from "react-icons/tb";
import { PiTimerBold } from "react-icons/pi";
import { SendReturnType } from "../../useSendMessage";

function ActionButton({
  message,
  setMessage,
  isLoading,
  send,
  TextArea,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  send: () => Promise<SendReturnType>;
  TextArea: MutableRefObject<HTMLTextAreaElement | null>;
}) {
  const sendMessage = async () => {
    if (Boolean(message)) {
      const response = await send();
      if (response?.data.status === "success") {
        setMessage("");
        if (TextArea.current) {
          TextArea.current.focus();
        }
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
