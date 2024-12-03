import { useState } from "react";
import ActionButton from "./_components/ActionButton";
import EmojiButton from "./_components/EmojiButton";
import FileAttachButton from "./_components/FileAttachButton";
import MessageInput from "./_components/MessageInput";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

function MessageBar({
  socketState,
}: {
  socketState: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
}) {
  const [message, setMessage] = useState("");

  return (
    <div className=" flex items-end gap-x-[1vw] px-[1vw] py-[1vh]">
      <EmojiButton />
      <FileAttachButton />
      <MessageInput message={message} setMessage={setMessage} />
      <ActionButton
        message={message}
        setMessage={setMessage}
        socketState={socketState}
      />
    </div>
  );
}

export default MessageBar;
