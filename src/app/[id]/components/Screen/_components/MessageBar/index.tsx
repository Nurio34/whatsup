import { useRef, useState } from "react";
import EmojiButton from "./_components/EmojiButton";
import FileAttachButton from "./_components/FileAttachButton";
import MessageInput from "./_components/MessageInput";
import { useAppSelector } from "@/store/hooks";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import { useSendMessage } from "./useSendMessage";
import { selectSelectedConnection } from "@/store/slices/chat";
import SendButton from "./_components/SendButton";
import AudioButton from "./_components/AudioButton";
import AudioRecorder from "./_components/AudioRecorder";

function MessageBar() {
  const user = useAppSelector(selectUser);
  const userId = user!.id;

  const selectedConnection = useAppSelector(selectSelectedConnection);
  const reciverId = selectedConnection!._id;

  const isMobile = useAppSelector(selectIsMoile);

  const [message, setMessage] = useState("");
  const { isLoading, send } = useSendMessage(userId, reciverId, message);

  const TextArea = useRef<HTMLTextAreaElement | null>(null);

  //! *** AUDIO RECORD CONF. ***
  const [isAudioRecorderVisible, setIsAudioRecorderVisible] = useState(false);
  const sendButtonCondition = Boolean(message) || isAudioRecorderVisible;
  //! **************************

  return (
    <div
      className={`flex items-center gap-x-[1vw] px-[1vw] py-[1vh]
      ${isAudioRecorderVisible ? " justify-end" : ""}
    `}
    >
      {!isMobile && !isAudioRecorderVisible && (
        <EmojiButton setMessage={setMessage} />
      )}
      {!isAudioRecorderVisible && <FileAttachButton />}
      {!isAudioRecorderVisible && (
        <MessageInput
          message={message}
          setMessage={setMessage}
          isLoading={isLoading}
          send={send}
          TextArea={TextArea}
        />
      )}
      {isAudioRecorderVisible && (
        <AudioRecorder setIsAudioRecorderVisible={setIsAudioRecorderVisible} />
      )}
      {sendButtonCondition ? (
        <SendButton
          message={message}
          setMessage={setMessage}
          isLoading={isLoading}
          send={send}
          TextArea={TextArea}
        />
      ) : (
        <AudioButton setIsAudioRecorderVisible={setIsAudioRecorderVisible} />
      )}
    </div>
  );
}

export default MessageBar;
