import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectMediaToAnimate,
  setCurrenMedias,
  setMediaToAnimate,
} from "@/store/slices/chat";
import {
  setAnimatedMediaSize,
  setIsGaleryOpen,
} from "@/store/slices/components";
import { MediaType, MessageType } from "@/type/message";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Media({
  media,
  aspectRatio,
  message,
}: {
  media: MediaType;
  aspectRatio: number | undefined;
  message: MessageType;
}) {
  const mediaToAnimate = useAppSelector(selectMediaToAnimate);

  const DivRef = useRef<HTMLDivElement | null>(null);
  const [divState, setDivState] = useState({ width: 0, height: 0 });
  const isSelected = media.asset_id === mediaToAnimate?.asset_id;

  useEffect(() => {
    if (DivRef.current) {
      const width = DivRef.current.getBoundingClientRect().width;
      const height = DivRef.current.getBoundingClientRect().height;
      setDivState({ width, height });
    }
  }, []);

  const dispatch = useAppDispatch();

  const openMediasInGalery = () => {
    dispatch(setIsGaleryOpen(true));
    dispatch(setCurrenMedias(message.medias));
    dispatch(setMediaToAnimate(media));
    dispatch(
      setAnimatedMediaSize({ width: divState.width, height: divState.height })
    );
  };

  return (
    <div ref={DivRef} className=" relative" onClick={openMediasInGalery}>
      <div>
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

      <div
        className={`absolute transition-all 
          ${isSelected ? "" : ""}
          `}
        style={{
          width: divState.width,
          height: divState.height,
          top: isSelected ? 100 : 0,
          left: isSelected ? 100 : 0,
          zIndex: isSelected ? 1 : 100,
        }}
      >
        {isSelected && media?.format === "jpg" ? (
          <Image src={media.url} fill alt="image" priority />
        ) : media?.format === "mp4" ? (
          <video src={media.url} className={`w-full`}></video>
        ) : null}
      </div>
    </div>
  );
}

export default Media;
