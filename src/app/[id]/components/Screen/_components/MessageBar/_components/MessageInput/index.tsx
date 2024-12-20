import {
  Dispatch,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
} from "react";
import { SendReturnType } from "../../useSendMessage";

function MessageInput({
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
  const sendMessage = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      if (Boolean(message)) {
        const response = await send();
        if (response?.data.status === "success") {
          setMessage("");
        }
      }
    }
  };

  return (
    <textarea
      ref={TextArea}
      name="message"
      id="message"
      className={`grow outline-none resize-none
        ${isLoading ? " text-sm text-gray-500" : ""}  
      `}
      rows={1}
      onChange={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
        setMessage(e.target.value);
      }}
      onKeyDown={sendMessage}
      value={message}
    ></textarea>
  );
}

export default MessageInput;
