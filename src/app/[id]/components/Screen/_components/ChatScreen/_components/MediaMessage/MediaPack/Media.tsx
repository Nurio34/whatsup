import { useAppDispatch } from "@/store/hooks";
import { setCurrenMedias, setCurrenMessage } from "@/store/slices/chat";
import { setIsGaleryOpen } from "@/store/slices/components";
import { MediaType, MessageType } from "@/type/message";
import { audioFormats } from "@/utils/cloudinaryFileFormats";
import { videoDuration } from "@/utils/videoDuration";
import Image from "next/image";
import { PiPlayFill, PiVideoCameraBold } from "react-icons/pi";

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

  return (
    <div onClick={openMediasInGalery} className=" w-full h-full relative">
      {media.resource_type === "image" && (
        <figure className=" w-full h-full relative" style={{ aspectRatio }}>
          <Image
            src={media.url}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="image"
          />
        </figure>
      )}
      {media.format === "mp4" && (
        <div
          className=" w-full h-full grid place-content-center"
          style={{
            backgroundImage: "url('/dark_icons.jpg')",
            backgroundPosition: "center",
          }}
        >
          <video src={media.url} className={``}></video>
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square rounded-full bg-white grid place-content-center shadow-md">
            <PiPlayFill size={26} />
          </div>
        </div>
      )}
      {audioFormats().includes(media.format) && (
        <figure
          className=" w-full aspect-square relative"
          style={{ aspectRatio }}
        >
          <Image
            src={"/audio_placeholder.webp"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="image"
          />
        </figure>
      )}
      {media.resource_type === "raw" && (
        <figure
          className=" w-full aspect-square relative"
          style={{ aspectRatio }}
        >
          <Image
            src={"/application_placeholder.webp"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="image"
          />
        </figure>
      )}
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
