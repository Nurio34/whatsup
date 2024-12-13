import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
  useRef,
} from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { MessageType } from "@/type/message";

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
  socketState?: Socket<DefaultEventsMap, DefaultEventsMap>;
  isSelectCheckboxesVisible: boolean;
  setIsSelectCheckboxesVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMessages: MessageType[];
  setSelectedMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
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
  const [rightClickedMessage, setRightClickedMessage] = useState(
    {} as MessageType
  );
  const menuPosition = useRef({ x: 0, y: 0 });
  const [contextMenuSize, setContextMenuSize] = useState({
    width: 0,
    height: 0,
  });

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
        x:
          mouseX > pageWidth - contextMenuSize.width
            ? mouseX - contextMenuSize.width
            : mouseX,
        y:
          mouseY > pageHeight - contextMenuSize.height
            ? mouseY - contextMenuSize.height
            : mouseY,
      };
    }
    setRightClickedMessage(message);
  };

  const [isSelectCheckboxesVisible, setIsSelectCheckboxesVisible] =
    useState(false);
  const [selectedMessages, setSelectedMessages] = useState<MessageType[]>(
    [] as MessageType[]
  );

  return (
    <Context.Provider
      value={{
        rightClickedMessage,
        setRightClickedMessage,
        handleContextMenu,
        menuPosition,
        contextMenuSize,
        setContextMenuSize,
        socketState,
        isSelectCheckboxesVisible,
        setIsSelectCheckboxesVisible,
        selectedMessages,
        setSelectedMessages,
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
