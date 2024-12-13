import { useAppSelector } from "@/store/hooks";
import { selectCurrentMedias } from "@/store/slices/chat";
import { selectIsMoile } from "@/store/slices/user";
import { MediaType } from "@/type/message";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

type RenderFromType = "left" | "right";

interface ContextType {
  scrollLeftPosition: number;
  listScrollableWidth: number;
  setListScrollableWidth: React.Dispatch<React.SetStateAction<number>>;
  currentMedia: MediaType | null;
  setCurrentMedia: React.Dispatch<React.SetStateAction<MediaType | null>>;
  currentMediaIndex: number;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  nextMedia: () => void;
  previouseMedia: () => void;
  selectMediaFromList: (index: number) => void;
  isMediaRendered: boolean;
  renderFrom: RenderFromType;
}

const Context = createContext<ContextType | undefined>(undefined);

interface ContextProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProps> = ({ children }) => {
  const isMobile = useAppSelector(selectIsMoile);
  const scrollAmount = isMobile ? 48 : 96;

  const currentMedias = useAppSelector(selectCurrentMedias);

  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  const [listScrollableWidth, setListScrollableWidth] = useState(0);

  const totalMedia = useRef(0);
  const [currentMedia, setCurrentMedia] = useState<MediaType | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [isMediaRendered, setIsMediaRendered] = useState(false);
  const [renderFrom, setRenderFrom] = useState<RenderFromType>("right");

  //! *** SCROLL MEDIA PREVIEW LIST ***
  useEffect(() => {
    const scrollList = () => {
      if (currentMedias) {
        setScrollLeftPosition((pre) => {
          if (
            currentMediaIndex >= 0 &&
            currentMediaIndex < currentMedias.length
          ) {
            return currentMediaIndex * scrollAmount;
          }
          return pre;
        });
      }
    };

    scrollList();
  }, [currentMediaIndex]);
  //! ******************************

  //! *** HANDLE MEDIA TO SHOW ***
  const nextMedia = () => {
    setCurrentMediaIndex((pre) => {
      if (pre < totalMedia.current - 1) {
        return pre + 1;
      }
      return pre;
    });
    setRenderFrom("right");
  };

  const previouseMedia = () => {
    setCurrentMediaIndex((pre) => {
      if (pre > 0) {
        return pre - 1;
      }
      return pre;
    });
    setRenderFrom("left");
  };

  const selectMediaFromList = (index: number) => {
    setCurrentMediaIndex(index);

    if (index > currentMediaIndex) {
      setRenderFrom("right");
    } else {
      setRenderFrom("left");
    }
  };

  useEffect(() => {
    if (currentMedias) {
      setCurrentMedia(currentMedias[currentMediaIndex]);
      totalMedia.current = currentMedias.length;
    } else {
      setCurrentMedia(null);
    }
  }, [currentMedias, currentMediaIndex]);
  //! *************************

  //! *** HANDLE MEDIA CHANGE ANIMATION ***
  useEffect(() => {
    setIsMediaRendered(false);
    const timeout = setTimeout(() => {
      setIsMediaRendered(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentMediaIndex]);
  //! *************************************

  return (
    <Context.Provider
      value={{
        scrollLeftPosition,
        listScrollableWidth,
        setListScrollableWidth,
        currentMedia,
        setCurrentMedia,
        currentMediaIndex,
        setCurrentMediaIndex,
        nextMedia,
        previouseMedia,
        selectMediaFromList,
        isMediaRendered,
        renderFrom,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGaleryContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGaleryContext must be used within a Context Provider");
  }
  return context;
};
