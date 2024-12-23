import { Dispatch, SetStateAction } from "react";
import { AiOutlineAudio } from "react-icons/ai";

function AudioButton({
  setIsAudioRecorderVisible,
}: {
  setIsAudioRecorderVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className=" px-2 py-1"
      onClick={() => setIsAudioRecorderVisible(true)}
    >
      <AiOutlineAudio size={24} />
    </button>
  );
}

export default AudioButton;
