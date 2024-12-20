import { useRef, useState } from "react";
import ActionButton from "./_components/ActionButton";
import EmojiButton from "./_components/EmojiButton";
import FileAttachButton from "./_components/FileAttachButton";
import MessageInput from "./_components/MessageInput";
import { useAppSelector } from "@/store/hooks";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import { useSendMessage } from "./useSendMessage";
import { selectSelectedConnection } from "@/store/slices/chat";

function MessageBar() {
  const user = useAppSelector(selectUser);
  const userId = user!.id;

  const selectedConnection = useAppSelector(selectSelectedConnection);
  const reciverId = selectedConnection!._id;

  const isMobile = useAppSelector(selectIsMoile);

  const [message, setMessage] = useState("");
  const { isLoading, send } = useSendMessage(userId, reciverId, message);

  const TextArea = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className=" flex items-center gap-x-[1vw] px-[1vw] py-[1vh]">
      {!isMobile && <EmojiButton setMessage={setMessage} />}
      <FileAttachButton />
      <MessageInput
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        send={send}
        TextArea={TextArea}
      />
      <ActionButton
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        send={send}
        TextArea={TextArea}
      />
    </div>
  );
}

export default MessageBar;
