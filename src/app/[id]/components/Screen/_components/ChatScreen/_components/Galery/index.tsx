import { useAppSelector } from "@/store/hooks";
import { selectCurrentMedias } from "@/store/slices/chat";
import { selectIsGaleryOpen } from "@/store/slices/components";
import { SectionStateType } from "../..";
import { useEffect, useState } from "react";
import { MediaType } from "@/type/message";
import CloseGaleryButton from "./_components/CloseGaleryButton";
import MediaContainer from "./_components/MediaContainer";
import MediasPreviewList from "./_components/MediasPreviewList";

function Gallery({ sectionState }: { sectionState: SectionStateType }) {
  const { width, height, top, left } = sectionState;

  const isGaleryOpen = useAppSelector(selectIsGaleryOpen);
  const currentMedias = useAppSelector(selectCurrentMedias);

  const [currentMedia, setCurrentMedia] = useState<MediaType | null>(null);

  useEffect(() => {
    if (currentMedias) {
      setCurrentMedia(currentMedias[0]);
    } else {
      setCurrentMedia(null);
    }
  }, [currentMedias]);

  if (currentMedias) {
    return (
      <>
        {isGaleryOpen && (
          <section
            className=" fixed w-full h-full bg-black bg-[rgba(107,114,128,0.5)] z-20
              grid grid-rows-[auto,1fr]
            "
            style={{ width, height, top, left }}
          >
            <CloseGaleryButton />
            <MediaContainer currentMedia={currentMedia} />
            <MediasPreviewList currentMedias={currentMedias} />
          </section>
        )}
      </>
    );
  }
}

export default Gallery;
