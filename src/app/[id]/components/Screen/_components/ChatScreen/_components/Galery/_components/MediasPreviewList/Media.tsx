import { MediaType } from "@/type/message";
import { audioFormats } from "@/utils/cloudinaryFileFormats";
import Image from "next/image";
import React from "react";
import { useGaleryContext } from "../../Context";
import { PiVideoCameraBold } from "react-icons/pi";
import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";

function Media({ media, index }: { media: MediaType; index: number }) {
  const isMobile = useAppSelector(selectIsMoile);

  const { currentMediaIndex, selectMediaFromList } = useGaleryContext();

  const onClick = () => selectMediaFromList(index);

  return (
    <li
      key={media.asset_id}
      className={`   
      `}
    >
      <button
        type="button"
        className={`w-10 md:w-20 aspect-square overflow-hidden rounded-sm md:rounded-md transition-all 
        relative grid place-content-center
         ${
           currentMediaIndex === index
             ? "outline outline-purple-500 outline-2"
             : ""
         }`}
        style={{
          filter:
            currentMediaIndex === index ? "brightness(1)" : "brightness(0.5)",
          backgroundImage:
            media.format === "mp4" ? "url('dark_icons.jpg')" : undefined,
        }}
        onClick={onClick}
      >
        <>
          {media.format === "jpg" && (
            <Image
              src={media.url}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              alt="image"
            />
          )}
          {media.format === "mp4" && <video src={media.url}></video>}
          {audioFormats().includes(media.format) && (
            <Image
              src={"/audio_placeholder.webp"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              alt="image"
            />
          )}
          {media.resource_type === "raw" && (
            <Image
              src={"/application_placeholder.webp"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              alt="image"
            />
          )}
        </>
        {media.format === "mp4" && !isMobile && (
          <div
            className=" absolute left-1 bottom-1 text-[10px] text-white
      flex items-center gap-1
      "
          >
            <PiVideoCameraBold size={12} />
            00:14
          </div>
        )}
      </button>
    </li>
  );
}

export default Media;
