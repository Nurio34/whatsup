import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentMessage } from "@/store/slices/chat";

function Message() {
  const currentMessage = useAppSelector(selectCurrentMessage);

  const [isMessageSeenFull, setIsMessageSeenFull] = useState(false);
  console.log({ isMessageSeenFull });

  return (
    <div
      className={`w-full  text-white absolute px-[4vw] mt-[2vh] flex overflow-hidden transition-all ${
        isMessageSeenFull ? " max-h-max" : "max-h-6"
      }`}
      onClick={() => {
        setIsMessageSeenFull(false);
      }}
    >
      <p className={`${!isMessageSeenFull ? "truncate" : ""}`}>
        {currentMessage}
      </p>
      {!isMessageSeenFull && (
        <button
          type="button"
          className=" min-w-max"
          onClick={(e) => {
            e.stopPropagation();
            setIsMessageSeenFull(true);
          }}
        >
          Devamını Oku
        </button>
      )}
    </div>
  );
}

export default Message;
