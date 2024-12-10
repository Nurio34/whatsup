import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentMedias } from "@/store/slices/chat";
import {
  selectAnimatedMediaSize,
  selectIsGaleryOpen,
  setIsGaleryOpen,
} from "@/store/slices/components";
import { GrFormClose } from "react-icons/gr";
import { SectionStateType } from "../..";
import { useEffect, useRef, useState } from "react";
import { MediaType } from "@/type/message";

function Gallery({ sectionState }: { sectionState: SectionStateType }) {
  const { width, height, top, left } = sectionState;

  const isGaleryOpen = useAppSelector(selectIsGaleryOpen);
  const currentMedias = useAppSelector(selectCurrentMedias);
  const animatedMediaSize = useAppSelector(selectAnimatedMediaSize);

  const [currentMedia, setCurrentMedia] = useState<MediaType | null>(null);

  const AnimatedMediaPlaceRef = useRef<HTMLDivElement | null>(null);
  const [animatedMediaPlaceOffset, setAnimatedMediaPlaceOffset] = useState({
    top: 0,
    left: 0,
  });

  console.log({ currentMedias, currentMedia, animatedMediaSize });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentMedias) {
      setCurrentMedia(currentMedias[0]);
    }
  }, [currentMedias]);

  useEffect(() => {
    if (AnimatedMediaPlaceRef.current) {
      const top = AnimatedMediaPlaceRef.current.getBoundingClientRect().top;
      const left = AnimatedMediaPlaceRef.current.getBoundingClientRect().left;
      console.log({ top, left });
    }
  }, [animatedMediaSize]);

  const closeGalery = () => dispatch(setIsGaleryOpen(false));

  if (currentMedias) {
    return (
      <>
        {isGaleryOpen && (
          <section
            className=" fixed w-full h-full bg-[rgba(107,114,128,0.8)]
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
              ref={AnimatedMediaPlaceRef}
              className="bg-red-400 opacity-30
              grid place-content-center
            "
            >
              <div
                className=" bg-purple-500"
                style={{
                  width: animatedMediaSize.width,
                  height: animatedMediaSize.height,
                }}
              ></div>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default Gallery;
