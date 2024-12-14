import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
  useRef,
  useEffect,
} from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { MessageType } from "@/type/message";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";

interface ContextType {
  rightClickedMessage: MessageType;
  setRightClickedMessage: React.Dispatch<React.SetStateAction<MessageType>>;
  handleContextMenu: (
    e: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    message: MessageType
  ) => void;
  menuPosition: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
  contextMenuSize: {
    width: number;
    height: number;
  };
  setContextMenuSize: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
  transformOrigin: string;
  socketState?: Socket<DefaultEventsMap, DefaultEventsMap>;
  isSelectCheckboxesVisible: boolean;
  setIsSelectCheckboxesVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMessages: MessageType[];
  setSelectedMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  isDeleteLoading: boolean;
  setIsDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<ContextType | undefined>(undefined);

interface ContextProps {
  children: ReactNode;
  socketState?: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export const ContextProvider: React.FC<ContextProps> = ({
  children,
  socketState,
}) => {
  const selectedConnection = useAppSelector(selectSelectedConnection);

  const [rightClickedMessage, setRightClickedMessage] = useState(
    {} as MessageType
  );
  const menuPosition = useRef({ x: 0, y: 0 });
  const [contextMenuSize, setContextMenuSize] = useState({
    width: 208,
    height: 316,
  });
  const [transformOrigin, setTransformOrigin] = useState("top");

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    message: MessageType
  ) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    if (menuPosition.current) {
      menuPosition.current = {
        x: mouseX > pageWidth - 208 ? mouseX - 208 : mouseX,
        y: mouseY > pageHeight - 316 ? mouseY - 316 : mouseY,
      };
    }
    setRightClickedMessage(message);

    if (mouseY > pageHeight - 316) {
      setTransformOrigin("bottom");
    } else {
      setTransformOrigin("top");
    }
  };

  //! *** SELECTED MESSAGES ***
  const [isSelectCheckboxesVisible, setIsSelectCheckboxesVisible] =
    useState(false);
  const [selectedMessages, setSelectedMessages] = useState<MessageType[]>(
    [] as MessageType[]
  );

  useEffect(() => {
    setIsSelectCheckboxesVisible(false);
    setSelectedMessages([]);
  }, [selectedConnection]);
  //! *************************

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        rightClickedMessage,
        setRightClickedMessage,
        handleContextMenu,
        menuPosition,
        contextMenuSize,
        setContextMenuSize,
        transformOrigin,
        socketState,
        isSelectCheckboxesVisible,
        setIsSelectCheckboxesVisible,
        selectedMessages,
        setSelectedMessages,
        isDeleteLoading,
        setIsDeleteLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChatScreenContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useChatScreenContext must be used within a Context Provider"
    );
  }
  return context;
};
