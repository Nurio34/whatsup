import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { MediaType } from "@/type/message";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function MediaContainer({ currentMedia }: { currentMedia: MediaType | null }) {
  const isMobile = useAppSelector(selectIsMoile);

  const [aspectRatio, setAspectRatio] = useState(0);

  const MediaContainer = useRef<HTMLDivElement | null>(null);
  const [mediaContainerSize, setMediaContainerSize] = useState({ w: 0, h: 0 });
  const [mediaSize, setMediaSize] = useState({ w: 0, h: 0 });
  const [padding, setPadding] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (currentMedia) {
      setAspectRatio(currentMedia.width / currentMedia.height);
    }
  }, [currentMedia]);

  useEffect(() => {
    const handleMediaContainerSize = () => {
      if (MediaContainer.current) {
        const w = MediaContainer.current.getBoundingClientRect().width;
        const h = MediaContainer.current.getBoundingClientRect().height;

        setMediaContainerSize({ w, h });
      }
    };

    handleMediaContainerSize();

    window.addEventListener("resize", handleMediaContainerSize);

    return () => {
      window.removeEventListener("resize", handleMediaContainerSize);
    };
  }, [currentMedia]);

  useEffect(() => {
    const w = (mediaContainerSize.w / 4) * 3.5;
    const h = (mediaContainerSize.w / 4) * 3.5;

    setMediaSize({ w, h });
  }, [mediaContainerSize]);

  useEffect(() => {
    const handlePadding = () => {
      const x = isMobile
        ? (window.innerWidth / 100) * 2
        : window.innerWidth / 100;
      const y = isMobile
        ? (window.innerHeight / 100) * 4
        : (window.innerHeight / 100) * 2;

      setPadding({ x, y });
    };

    handlePadding();

    window.addEventListener("resize", handlePadding);

    return () => {
      window.removeEventListener("resize", handlePadding);
    };
  }, [currentMedia, isMobile]);

  return (
    <div
      ref={MediaContainer}
      className="grid place-content-center overflow-hidden"
    >
      <div
        className=" relative bg-red-300"
        style={{
          height: aspectRatio <= 1 ? mediaSize.h : undefined,
          maxHeight: mediaContainerSize.h - padding.y,
          width: aspectRatio > 1 ? mediaSize.w : undefined,
          maxWidth: mediaContainerSize.w - padding.x,
          aspectRatio: aspectRatio ? aspectRatio : undefined,
        }}
      >
        {currentMedia?.format === "jpg" && (
          <Image src={currentMedia.url} fill priority alt="image" />
        )}
        {currentMedia?.format === "mp4" && (
          <video
            src={currentMedia.url}
            className=" w-full h-full"
            controls
          ></video>
        )}
      </div>
    </div>
  );
}

export default MediaContainer;
