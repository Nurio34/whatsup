import { MediaType } from "@/type/message";
import { useEffect, useRef, useState } from "react";
import Media from "./Media";
import { useGaleryContext } from "../../Context";

function MediasPreviewList({ currentMedias }: { currentMedias: MediaType[] }) {
  const { scrollLeftPosition, setListScrollableWidth } = useGaleryContext();

  const MediasPreviewListContainer = useRef<HTMLDivElement | null>(null);
  const MediasPreviewListRef = useRef<HTMLUListElement | null>(null);
  const [isListOverflow, setIsListOverflow] = useState(false);

  useEffect(() => {
    if (MediasPreviewListContainer.current && MediasPreviewListRef.current) {
      const containerWidth = MediasPreviewListContainer.current.clientWidth;
      const listWidth = MediasPreviewListRef.current.scrollWidth;
      setIsListOverflow(listWidth > containerWidth);
      setListScrollableWidth(listWidth - containerWidth);
    }
  }, []);

  useEffect(() => {
    if (MediasPreviewListContainer.current) {
      MediasPreviewListContainer.current.scrollTo({
        left: scrollLeftPosition,
        behavior: "smooth",
      });
    }
  }, [scrollLeftPosition]);

  return (
    <div
      ref={MediasPreviewListContainer}
      className={`noScrollbar flex ${
        isListOverflow ? "justify-start" : "justify-center"
      } overflow-auto`}
    >
      <ul
        ref={MediasPreviewListRef}
        className=" flex gap-2 md:gap-4 py-[1vh] px-[1vw]"
      >
        {currentMedias.map((media, index) => (
          <Media key={media.asset_id} media={media} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default MediasPreviewList;
