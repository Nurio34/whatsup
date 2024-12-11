import React, { Dispatch, SetStateAction, useRef } from "react";
import { MediaPreviewType } from "../..";
import SingleMediaPreview from "./SingleMediaPreview";
import MultipleMediaPreview from "./MultipleMediaPreview";
import MessageBar from "./MessageBar";
import { GrFormClose } from "react-icons/gr";
import { SendReturnType } from "../../../../useSendMessage";

function MediaMessagePreviewModal({
  mediaPreview,
  message,
  setMessage,
  setMediaPreview,
  setMediaFiles,
  isLoading,
  send,
}: {
  mediaPreview: MediaPreviewType[];
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setMediaPreview: Dispatch<SetStateAction<MediaPreviewType[]>>;
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  isLoading: boolean;
  send: () => Promise<SendReturnType>;
}) {
  const MediaMessagePreviewModalRef = useRef<HTMLDivElement | null>(null);

  const deleteMediaMessage = () => {
    setMessage("");
    setMediaPreview([]);
    setMediaFiles([]);
  };

  return (
    <div
      ref={MediaMessagePreviewModalRef}
      className=" absolute bottom-0 bg-gray-300 py-[1vh] px-[2vw] rounded-lg shadow-lg z-20"
    >
      <button
        type="button"
        className=" absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 z-50 rounded-full shadow-md shadow-[red] border-[1px] border-[red]"
        disabled={isLoading}
        onClick={deleteMediaMessage}
      >
        <GrFormClose size={20} color="red" />
      </button>
      {mediaPreview.length === 1 ? (
        <SingleMediaPreview mediaPreview={mediaPreview[0]} />
      ) : (
        <MultipleMediaPreview
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMediaFiles={setMediaFiles}
          isLoading={isLoading}
        />
      )}
      <MessageBar
        message={message}
        setMessage={setMessage}
        setMediaFiles={setMediaFiles}
        setMediaPreview={setMediaPreview}
        isLoading={isLoading}
        send={send}
      />
    </div>
  );
}

export default MediaMessagePreviewModal;
