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

  const MediaElement = useRef<HTMLDivElement | null>(null);
  const [mediaSize, setMediaSize] = useState({ height: 0, width: 0 });

  const [padding, setPadding] = useState({ x: 0, y: 0 });
  console.log(padding);

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
    if (MediaElement.current) {
      const height = MediaElement.current.getBoundingClientRect().height;
      const width = MediaElement.current.getBoundingClientRect().height;
      setMediaSize({ height, width });
    }
  }, [currentMedia]);

  useEffect(() => {
    const paddingX = isMobile
      ? window.innerWidth / 100
      : (window.innerWidth / 100) * 3;
    const paddingY = isMobile
      ? window.innerHeight / 100
      : (window.innerHeight / 100) * 3;

    const handlePadding = () => {
      setPadding({ x: paddingX, y: paddingY });
    };

    handlePadding();

    window.addEventListener("resize", handlePadding);

    return () => {
      window.removeEventListener("resize", handlePadding);
    };
  }, [isMobile]);

  const closeGalery = () => {
    dispatch(setIsGaleryOpen(false));
    dispatch(setCurrenMedias(null));
  };

  if (currentMedias) {
    return (
      <>
        {isGaleryOpen && (
          <section
            className=" fixed w-full h-full bg-[rgba(107,114,128,0.5)]
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
              ref={MediaElement}
              className="grid place-content-center overflow-hidden"
            >
              <div
                className=" relative"
                style={{
                  height:
                    aspectRatio <= 1 ? mediaSize.height - padding.y : undefined,
                  width:
                    aspectRatio > 1 ? mediaSize.width - padding.x : undefined,
                  aspectRatio: aspectRatio,
                }}
              >
                {currentMedia?.format === "jpg" && (
                  <Image src={currentMedia.url} fill priority alt="image" />
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
