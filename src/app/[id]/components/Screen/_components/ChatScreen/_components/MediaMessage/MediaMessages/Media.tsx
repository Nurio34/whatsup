import { useAppDispatch } from "@/store/hooks";
import { setCurrenMedias } from "@/store/slices/chat";
import { setIsGaleryOpen } from "@/store/slices/components";
import { MediaType, MessageType } from "@/type/message";
import Image from "next/image";

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
          controls
        ></video>
      )}
      {media.format === "mp3" && <audio src={media.url} controls></audio>}
    </div>
  );
}

export default Media;
