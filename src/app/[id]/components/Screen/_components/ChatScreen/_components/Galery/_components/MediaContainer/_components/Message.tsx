import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentMessage } from "@/store/slices/chat";

function Message() {
  const currentMessage = useAppSelector(selectCurrentMessage);

  const [isMessageSeenFull, setIsMessageSeenFull] = useState(false);

  const DivRef = useRef<HTMLDivElement | null>(null);
  const ParRef = useRef<HTMLParagraphElement | null>(null);
  const [isParOverflowed, setIsParOverflowed] = useState(false);

  useEffect(() => {
    const handleIsParOverflowed = () => {
      if (DivRef.current && ParRef.current) {
        const divHeight = DivRef.current.getBoundingClientRect().height;
        const parHeight = ParRef.current.scrollHeight;

        if (parHeight > divHeight) {
          setIsParOverflowed(true);
        } else {
          setIsParOverflowed(false);
        }
      }
    };

    handleIsParOverflowed();

    window.addEventListener("resize", handleIsParOverflowed);

    return () => window.removeEventListener("resize", handleIsParOverflowed);
  }, []);

  return (
    <>
      {currentMessage && (
        <div
          ref={DivRef}
          className={`w-full text-white absolute px-[4vw] mt-[2vh] flex overflow-hidden transition-all ${
            isMessageSeenFull ? " max-h-max" : "max-h-6"
          }`}
          onClick={() => {
            setIsMessageSeenFull(false);
          }}
        >
          <p
            ref={ParRef}
            className={`${
              isParOverflowed && !isMessageSeenFull ? "truncate" : ""
            }`}
          >
            {currentMessage}
          </p>
          {isParOverflowed && !isMessageSeenFull && (
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
      )}
    </>
  );
}

export default Message;
