import { useRef } from "react";
import Media from "./_components/Media";
import ScrollButtons from "./_components/ScrollButtons";
import Message from "./_components/Message";

function MediaContainer() {
  const MediaContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={MediaContainerRef}
      className="grid place-content-center overflow-hidden"
    >
      <Media MediaContainerRef={MediaContainerRef} />
      <ScrollButtons />
      <Message />
    </div>
  );
}

export default MediaContainer;
