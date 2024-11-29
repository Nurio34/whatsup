import { Dispatch, SetStateAction } from "react";

function MessageInput({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
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
      value={message}
    ></textarea>
  );
}

export default MessageInput;
