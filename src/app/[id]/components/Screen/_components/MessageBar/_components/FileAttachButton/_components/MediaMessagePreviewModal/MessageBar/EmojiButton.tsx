import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

function EmojiButton({
  setMessage,
}: {
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const EmojiPickerElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeEmojiPicker = (e: MouseEvent) => {
      const el = e.target;
      if (EmojiPickerElement.current) {
        if (!EmojiPickerElement.current.contains(el as Node))
          setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", closeEmojiPicker);

    return () => {
      document.removeEventListener("click", closeEmojiPicker);
    };
  }, []);

  return (
    <div
      ref={EmojiPickerElement}
      className=" relative grid place-content-center"
    >
      <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
        <BsEmojiSmile size={20} />
      </button>
      {showEmojiPicker && (
        <div className=" absolute bottom-0">
          <EmojiPicker
            onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiButton;
