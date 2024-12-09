import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useSendMessage } from "../../useSendMessage";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/user";
import { selectSelectedConnection } from "@/store/slices/chat";

function MessageInput({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const user = useAppSelector(selectUser);

  const selectedConnection = useAppSelector(selectSelectedConnection);

  const { send } = useSendMessage(user!.id, selectedConnection!._id, message);

  const sendMessage = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
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
      name="message"
      id="message"
      className="grow outline-none resize-none"
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
