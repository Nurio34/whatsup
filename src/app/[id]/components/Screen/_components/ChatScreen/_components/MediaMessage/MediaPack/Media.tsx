import { MediaType } from "@/type/message";
import Image from "next/image";
import { PiPlayFill } from "react-icons/pi";

function Media({
  media,
  aspectRatio,
}: {
  media: MediaType;
  aspectRatio: number | undefined;
}) {
  return (
    <>
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
    </>
  );
}

export default Media;
