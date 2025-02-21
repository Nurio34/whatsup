import { useAppDispatch } from "@/store/hooks";
import { setCurrenMedias, setCurrenMessage } from "@/store/slices/chat";
import { setIsGaleryOpen } from "@/store/slices/components";
import { MediaType, MessageType } from "@/type/message";
import { audioFormats } from "@/utils/cloudinaryFileFormats";
import { videoDuration } from "@/utils/videoDuration";
import Image from "next/image";
import { PiVideoCameraBold } from "react-icons/pi";

function Media({
  media,
  aspectRatio,
  message,
}: {
  media: MediaType;
  aspectRatio: number | undefined;
  message: MessageType;
}) {
  const dispatch = useAppDispatch();

  const openMediasInGalery = () => {
    dispatch(setIsGaleryOpen(true));
    dispatch(setCurrenMedias(message.medias));
    dispatch(setCurrenMessage(message.message));
  };
  console.log({ media });
  return (
    <div onClick={openMediasInGalery} className=" relative">
      <>
        {media.resource_type === "image" && (
          <div className="min-w-40 max-w-48 relative" style={{ aspectRatio }}>
            <Image
              src={media.url}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              alt="image"
            />
          </div>
        )}
        {media.format === "mp4" && (
          <video
            src={media.url}
            className={`${message.message ? " max-w-48" : "w-40"}`}
            style={{ aspectRatio }}
          ></video>
        )}
        {audioFormats().includes(media.format) && (
          <audio src={media.url} controls></audio>
        )}
        {media.resource_type === "raw" && (
          <div
            className="min-w-40 max-w-48 aspect-square relative"
            style={{ aspectRatio }}
          >
            <Image
              src={"/application_placeholder.webp"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              alt="image"
            />
          </div>
        )}
      </>
      {media.format === "mp4" && (
        <div
          className=" absolute left-1 bottom-1 text-xs text-white
      flex items-center gap-1
      "
        >
          <PiVideoCameraBold size={16} />
          {videoDuration(media.duration)}
        </div>
      )}
    </div>
  );
}

export default Media;
