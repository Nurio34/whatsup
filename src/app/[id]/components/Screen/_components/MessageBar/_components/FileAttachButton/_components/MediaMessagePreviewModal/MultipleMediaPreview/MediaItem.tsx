import React, { Dispatch, SetStateAction, useState } from "react";
import { MediaPreviewType } from "../../..";
import Image from "next/image";
import { GrFormClose } from "react-icons/gr";

function MediaItem({
  index,
  media,
  setCurrentMedia,
  setMediaPreview,
  setMediaFiles,
  currentMedia,
  mediaPreview,
}: {
  index: number;
  media: MediaPreviewType;
  setCurrentMedia: Dispatch<SetStateAction<MediaPreviewType>>;
  setMediaPreview: Dispatch<SetStateAction<MediaPreviewType[]>>;
  setMediaFiles: Dispatch<SetStateAction<File[]>>;
  currentMedia: MediaPreviewType;
  mediaPreview: MediaPreviewType[];
}) {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const handleCurrentMedia = (media: MediaPreviewType) => {
    setCurrentMedia(media);
  };

  const deleteMedia = () => {
    setMediaPreview((prev) => {
      const mediaPreview = prev;

      const updatedMediaPreview = mediaPreview.filter(
        (_, ind) => ind !== index
      );

      return updatedMediaPreview;
    });
    setMediaFiles((prev) => {
      const mediaPreview = prev;

      const updatedMediaPreview = mediaPreview.filter(
        (_, ind) => ind !== index
      );

      return updatedMediaPreview;
    });

    if (media.url === currentMedia.url) setCurrentMedia(mediaPreview[0]);
  };

  return (
    <li
      className="aspect-square basis-9 relative grid place-content-center rounded-sm overflow-hidden"
      style={{
        boxShadow:
          currentMedia.url === media.url
            ? "0 0 5px purple,0 0 10px purple,0 0 15px purple"
            : undefined,
      }}
      onMouseEnter={() => setIsDeleteButtonVisible(true)}
      onMouseLeave={() => setIsDeleteButtonVisible(false)}
    >
      <button onClick={() => handleCurrentMedia(media)}>
        {media.type === "image" && <Image src={media.url} fill alt="image" />}
        {media.type === "video" && <video src={media.url}></video>}
        {media.type === "audio" && (
          <Image src={"/audio_placeholder.webp"} fill alt="image" />
        )}
        {media.type === "application" && (
          <Image src={"/application_placeholder.webp"} fill alt="image" />
        )}
      </button>
      {isDeleteButtonVisible && (
        <button
          type="button"
          className=" absolute top-0 right-0"
          onClick={deleteMedia}
        >
          <GrFormClose size={20} color="red" />
        </button>
      )}
    </li>
  );
}

export default MediaItem;
