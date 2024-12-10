import { useAppDispatch } from "@/store/hooks";
import { setCurrenMedias } from "@/store/slices/chat";
import { setIsGaleryOpen } from "@/store/slices/components";
import { MediaType, MessageType } from "@/type/message";
import Image from "next/image";
import { PiPlayFill } from "react-icons/pi";

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
  };

  return (
    <div onClick={openMediasInGalery}>
      {media.format === "jpg" && (
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
        <div className="">
          <video src={media.url} className={``}></video>
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square rounded-full bg-white grid place-content-center shadow-md">
            <PiPlayFill size={26} />
          </div>
        </div>
      )}
      {media.format === "mp3" && (
        <figure className=" w-full h-full relative" style={{ aspectRatio }}>
          <Image
            src={"/audio_placeholder.webp"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="image"
          />
        </figure>
      )}
    </div>
  );
}

export default Media;
