import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentMedias, setCurrenMedias } from "@/store/slices/chat";
import { selectIsGaleryOpen, setIsGaleryOpen } from "@/store/slices/components";
import { GrFormClose } from "react-icons/gr";
import { SectionStateType } from "../..";
import { useEffect, useRef, useState } from "react";
import { MediaType } from "@/type/message";
import Image from "next/image";
import { selectIsMoile } from "@/store/slices/user";

function Gallery({ sectionState }: { sectionState: SectionStateType }) {
  const { width, height, top, left } = sectionState;

  const isGaleryOpen = useAppSelector(selectIsGaleryOpen);
  const currentMedias = useAppSelector(selectCurrentMedias);
  const isMobile = useAppSelector(selectIsMoile);

  const [currentMedia, setCurrentMedia] = useState<MediaType | null>(null);
  const [aspectRatio, setAspectRatio] = useState(0);

  const MediaContainer = useRef<HTMLDivElement | null>(null);
  const [mediaContainerSize, setMediaContainerSize] = useState({ w: 0, h: 0 });
  const [mediaSize, setMediaSize] = useState({ w: 0, h: 0 });
  const [padding, setPadding] = useState({ x: 0, y: 0 });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentMedias) {
      setCurrentMedia(currentMedias[0]);
    } else {
      setCurrentMedia(null);
    }
  }, [currentMedias]);

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
  }, [currentMedias]);

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
  }, [currentMedias, isMobile]);

  const closeGalery = () => {
    dispatch(setIsGaleryOpen(false));
    dispatch(setCurrenMedias(null));
  };

  if (currentMedias) {
    return (
      <>
        {isGaleryOpen && (
          <section
            className=" fixed w-full h-full bg-black bg-[rgba(107,114,128,0.5)]
              grid grid-rows-[auto,1fr]
            "
            style={{ width, height, top, left }}
          >
            <button
              type="button"
              className=" justify-self-end self-start p-1 m-[1vw] border-[1px] border-[red] shadow-md shadow-[red] rounded-full"
              onClick={closeGalery}
            >
              <GrFormClose />
            </button>
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
          </section>
        )}
      </>
    );
  }
}

export default Gallery;
