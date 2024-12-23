import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TbSend2 } from "react-icons/tb";
import { PiTimerBold } from "react-icons/pi";
import { SendReturnType } from "../../useSendMessage";

function SendButton({
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
    if (TextArea.current) {
      TextArea.current.focus();
    }
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
      className=" transition-all hover:scale-110 active:scale-95 bg-green-500 p-2 rounded-sm"
    >
      {isLoading ? (
        <PiTimerBold color="white" size={24} />
      ) : (
        <TbSend2 size={24} color="white" />
      )}
    </button>
  );
}

export default SendButton;
