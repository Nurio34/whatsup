import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { audioFormats } from "@/utils/cloudinaryFileFormats";
import Image from "next/image";
import {
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGaleryContext } from "../../../Context";
import { AnimatePresence, motion } from "framer-motion";

export interface TouchStateType {
  x: {
    start: number;
    end: number;
  };
}

function Media({
  MediaContainerRef,
}: {
  MediaContainerRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  const {
    currentMedia,
    isMediaRendered,
    renderFrom,
    nextMedia,
    previouseMedia,
  } = useGaleryContext();

  const [aspectRatio, setAspectRatio] = useState(0);

  const [mediaContainerSize, setMediaContainerSize] = useState({ w: 0, h: 0 });
  const [mediaSize, setMediaSize] = useState({ w: 0, h: 0 });
  const [padding, setPadding] = useState({ x: 0, y: 0 });

  const VideoPlayerRef = useRef<HTMLVideoElement | null>(null);

  const [touchState, setTouchState] = useState<TouchStateType>({
    x: {
      start: 0,
      end: 0,
    },
  });

  const zoomToggle = (e: MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.classList.contains("scale-[2]")) {
      return e.currentTarget.classList.remove("scale-[2]");
    }
    e.currentTarget.classList.add("scale-[2]");
  };

  useEffect(() => {
    if (currentMedia) {
      setAspectRatio(currentMedia.width / currentMedia.height);
    }
  }, [currentMedia]);

  useEffect(() => {
    const handleMediaContainerSize = () => {
      if (MediaContainerRef.current) {
        const w = MediaContainerRef.current.getBoundingClientRect().width;
        const h = MediaContainerRef.current.getBoundingClientRect().height;

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

  //! *** MOBILE SLIDE EVENT ***
  useEffect(() => {
    const diff = touchState.x.start - touchState.x.end;
    if (diff > 30) {
      nextMedia();
    }
    if (diff < -30) {
      previouseMedia();
    }
  }, [touchState.x.end]);
  //! **************************

  if (currentMedia) {
    return (
      <AnimatePresence>
        {isMediaRendered && (
          <motion.div
            className=" relative w-96 aspect-square grid place-content-center"
            style={{
              height: aspectRatio <= 1 ? mediaSize.h : undefined,
              maxHeight: mediaContainerSize.h - padding.y,
              width: aspectRatio > 1 ? mediaSize.w : undefined,
              maxWidth: mediaContainerSize.w - padding.x,
              aspectRatio: aspectRatio ? aspectRatio : undefined,
            }}
            initial={{
              x: renderFrom === "right" ? "50%" : "-50%",
              opacity: 1,
            }}
            animate={{ x: "0%", opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              x: renderFrom === "right" ? "-50%" : "50%",
              opacity: 0,
              transition: { duration: 0.15 },
            }}
            onTouchStart={(e) => {
              setTouchState((prev) => ({
                ...prev,
                x: { ...prev.x, start: e.touches[0].screenX },
              }));
            }}
            onTouchEnd={(e) => {
              setTouchState((prev) => ({
                ...prev,
                x: { ...prev.x, end: e.changedTouches[0].screenX },
              }));
            }}
          >
            {currentMedia.resource_type === "image" && (
              <Image
                src={currentMedia.url}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                priority
                alt="image"
                className=" object-contain transition-all"
                onClick={zoomToggle}
              />
            )}
            {currentMedia.format === "mp4" && (
              <>
                <video
                  ref={VideoPlayerRef}
                  src={currentMedia.url}
                  style={{
                    height: aspectRatio <= 1 ? mediaSize.h : undefined,
                    maxHeight: mediaContainerSize.h - padding.y,
                    width: aspectRatio > 1 ? mediaSize.w : undefined,
                    maxWidth: mediaContainerSize.w - padding.x,
                    aspectRatio: aspectRatio ? aspectRatio : undefined,
                  }}
                  controls
                ></video>
              </>
            )}
            {audioFormats().includes(currentMedia.format) && (
              <audio src={currentMedia.url} controls></audio>
            )}
            {currentMedia.resource_type === "raw" && (
              <Image
                src={"/application_placeholder.webp"}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                priority
                alt="image"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}

export default Media;
