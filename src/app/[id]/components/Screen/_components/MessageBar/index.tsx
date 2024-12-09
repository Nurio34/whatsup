import { useState } from "react";
import ActionButton from "./_components/ActionButton";
import EmojiButton from "./_components/EmojiButton";
import FileAttachButton from "./_components/FileAttachButton";
import MessageInput from "./_components/MessageInput";
import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";

function MessageBar() {
  const isMobile = useAppSelector(selectIsMoile);

  const [message, setMessage] = useState("");

  return (
    <div className=" flex items-end gap-x-[1vw] px-[1vw] py-[1vh]">
      {!isMobile && <EmojiButton setMessage={setMessage} />}
      <FileAttachButton />
      <MessageInput message={message} setMessage={setMessage} />
      <ActionButton message={message} setMessage={setMessage} />
    </div>
  );
}

export default MessageBar;
