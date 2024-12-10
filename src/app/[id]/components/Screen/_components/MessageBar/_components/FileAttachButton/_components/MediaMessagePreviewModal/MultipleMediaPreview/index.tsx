import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import MediaItem from "./MediaItem";
import { MediaPreviewType } from "../../..";

function MultipleMediaPreview({
  mediaPreview,
  setMediaPreview,
  setMediaFiles,
  isLoading,
}: {
  mediaPreview: MediaPreviewType[];
  setMediaPreview: Dispatch<SetStateAction<MediaPreviewType[]>>;
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  isLoading: boolean;
}) {
  const [currentMedia, setCurrentMedia] = useState<MediaPreviewType>(
    mediaPreview[0]
  );

  return (
    <div className="min-w-80 md:min-w-96 aspect-square space-y-[1vh]">
      <div className=" relative aspect-square flex justify-center overflow-hidden rounded-lg">
        {currentMedia.type === "image" && (
          <Image
            src={currentMedia.url}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="image"
          />
        )}
        {currentMedia.type === "video" && (
          <video
            className=" absolute bottom-0 max-h-96"
            src={currentMedia.url}
            controls
          ></video>
        )}
        {currentMedia.type === "audio" && (
          <audio
            className=" absolute bottom-0 max-h-96"
            src={currentMedia.url}
            controls
          ></audio>
        )}
        {currentMedia.type === "application" && (
          <Image
            src={"/application_placeholder.webp"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="image"
          />
        )}
      </div>
      <ul className="flex gap-[3vw] md:gap-[1vw] flex-wrap py-[2vh]">
        {mediaPreview.map((media, index) => (
          <MediaItem
            key={media.url}
            index={index}
            media={media}
            setCurrentMedia={setCurrentMedia}
            setMediaPreview={setMediaPreview}
            setMediaFiles={setMediaFiles}
            currentMedia={currentMedia}
            mediaPreview={mediaPreview}
            isLoading={isLoading}
          />
        ))}
      </ul>
    </div>
  );
}

export default MultipleMediaPreview;
