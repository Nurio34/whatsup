import { GrCheckboxSelected } from "react-icons/gr";
import { LiaStar } from "react-icons/lia";
import {
  PiArrowBendUpLeftBold,
  PiArrowBendUpRightBold,
  PiCopySimpleBold,
  PiShareBold,
} from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxDrawingPin } from "react-icons/rx";
import { useChatScreenContext } from "../../Context";
import { MouseEvent, useEffect, useRef } from "react";
import { deleteMessage } from "./actions/deleteMessage";
import { MessageType } from "@/type/message";
import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import { selectUser } from "@/store/slices/user";
import { copyMessage } from "./actions/copyMessage";
import { handleSelect } from "./actions/handleSelect";
import { motion } from "framer-motion";

const contextMenuItems = [
  {
    name: "Response",
    icons: <PiArrowBendUpLeftBold />,
    border: false,
    action: () => {},
  },
  {
    name: "Copy",
    icons: <PiCopySimpleBold />,
    border: true,
    action: () => {},
  },
  {
    name: "Forward",
    icons: <PiArrowBendUpRightBold />,
    border: false,
    action: () => {},
  },
  {
    name: "Add Star",
    icons: <LiaStar />,
    border: false,
    action: () => {},
  },
  {
    name: "Pin",
    icons: <RxDrawingPin />,
    border: false,
    action: () => {},
  },
  {
    name: "Delete",
    icons: <RiDeleteBinLine />,
    border: true,
    action: deleteMessage,
  },
  {
    name: "Select",
    icons: <GrCheckboxSelected />,
    border: false,
    action: () => {},
  },
  {
    name: "Share",
    icons: <PiShareBold />,
    border: false,
    action: () => {},
  },
];

function ContextMenu() {
  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const selectedConnection = useAppSelector(selectSelectedConnection);
  const connectionId = selectedConnection?._id;

  const {
    menuPosition,
    handleContextMenu,
    setRightClickedMessage,
    rightClickedMessage,
    setContextMenuSize,
    socketState,
    setIsSelectCheckboxesVisible,
    setSelectedMessages,
    setIsDeleteLoading,
    isDeleteLoading,
    transformOrigin,
  } = useChatScreenContext();

  const ContextMenuRef = useRef<HTMLUListElement | null>(null);

  const onClick = (e: MouseEvent<HTMLButtonElement>, itemName: string) => {
    if (ContextMenuRef.current && rightClickedMessage !== ({} as MessageType)) {
      const width = ContextMenuRef.current.getBoundingClientRect().width;
      const height = ContextMenuRef.current.getBoundingClientRect().height;
      setContextMenuSize({ width, height });
    }

    if (itemName === "Delete")
      deleteMessage(
        rightClickedMessage,
        userId,
        connectionId,
        socketState,
        setIsDeleteLoading
      );
    else if (itemName === "Copy") copyMessage(rightClickedMessage.message);
    else if (itemName === "Select") {
      setIsSelectCheckboxesVisible(true);
      setSelectedMessages([rightClickedMessage]);
      handleSelect();
    }
    handleContextMenu(e, {} as MessageType);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (ContextMenuRef.current) {
        if (!ContextMenuRef.current.contains(e.target as Node)) {
          setRightClickedMessage({} as MessageType);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (ContextMenuRef.current && rightClickedMessage !== ({} as MessageType)) {
      const width = ContextMenuRef.current.getBoundingClientRect().width;
      const height = ContextMenuRef.current.getBoundingClientRect().height;
      setContextMenuSize({ width, height });
    }
  }, [rightClickedMessage]);

  return (
    <motion.ul
      ref={ContextMenuRef}
      className="fixed min-w-52 z-10 bg-gray-300 rounded-md py-[1.5vh] overflow-hidden"
      style={{
        top: menuPosition.current.y,
        left: menuPosition.current.x,
        transformOrigin: transformOrigin,
      }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1, transition: { type: "tween", duration: 0.1 } }}
    >
      {contextMenuItems.map((item) => (
        <li
          key={item.name}
          className={`px-[2vw] py-[0.5vw] ${item.border ? "border-b" : ""} `}
        >
          <button
            type="button"
            className={`flex items-center gap-[1vw] w-full rounded-md transition-all 
                ${
                  item.name === "Delete" &&
                  rightClickedMessage.senderId !== userId
                    ? "text-gray-400"
                    : "hover:bg-gray-200"
                }
            `}
            onClick={async (e) => {
              onClick(e, item.name);
            }}
            disabled={
              (item.name === "Delete" &&
                rightClickedMessage.senderId !== userId) ||
              isDeleteLoading
            }
          >
            {item.icons}
            {item.name}
          </button>
        </li>
      ))}
    </motion.ul>
  );
}

export default ContextMenu;
