import { useAppSelector } from "@/store/hooks";
import { selectCurrentMedias } from "@/store/slices/chat";
import { selectIsGaleryOpen } from "@/store/slices/components";
import { SectionStateType } from "../..";
import MediaContainer from "./_components/MediaContainer";
import MediasPreviewList from "./_components/MediasPreviewList";
import { ContextProvider } from "./Context";
import ActionButtons from "./_components/ActionButtons";

function Gallery({ sectionState }: { sectionState: SectionStateType }) {
  const { width, height, top, left } = sectionState;

  const isGaleryOpen = useAppSelector(selectIsGaleryOpen);
  const currentMedias = useAppSelector(selectCurrentMedias);

  if (currentMedias) {
    return (
      <ContextProvider>
        {isGaleryOpen && (
          <section
            className=" fixed w-full h-full bg-black  z-20
              grid grid-rows-[auto,1fr]
            "
            style={{ width, height, top, left }}
          >
            <ActionButtons />
            <MediaContainer />
            <MediasPreviewList currentMedias={currentMedias} />
          </section>
        )}
      </ContextProvider>
    );
  }
}

export default Gallery;
