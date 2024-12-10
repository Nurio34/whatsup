import { useAppSelector } from "@/store/hooks";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import { selectChat } from "@/store/slices/chat";

import SideMenuNav from "../../../SideMenu";
import Message from "./_components/Message";
import { ChatsUserType } from "@/type/user";
import { useEffect, useRef, useState } from "react";
import { date } from "@/utils/date";
import { time } from "@/utils/time";
import Gallery from "./_components/Galery";

export type SectionStateType = {
  width: number;
  height: number;
  top: number;
  left: number;
};

function ChatScreen({
  selectedConnection,
}: {
  selectedConnection: ChatsUserType;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  const user = useAppSelector(selectUser);
  const userId = user?.id;

  const connectionId = selectedConnection._id;

  const chat = useAppSelector(selectChat);
  const chatOfSelectedConnection = chat.find(
    (item) => item.connectionId === connectionId
  )!;

  const [sectionState, setSectionState] = useState<SectionStateType>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const SectionElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleSectionHeight = () => {
      if (SectionElement.current) {
        const width = SectionElement.current.getBoundingClientRect().width;
        const height = SectionElement.current.getBoundingClientRect().height;
        const offsetTop = SectionElement.current.offsetTop;
        const offsetLeft = SectionElement.current.offsetLeft;
        setSectionState({ width, height, top: offsetTop, left: offsetLeft });
      }
    };

    handleSectionHeight();

    window.addEventListener("resize", handleSectionHeight);

    return () => {
      window.removeEventListener("resize", handleSectionHeight);
    };
  }, []);

  return (
    <section
      ref={SectionElement}
      className="grow relative overflow-y-auto customScrollbar"
      style={{
        backgroundImage: "url('/chat-bg.jpg')",
      }}
    >
      {isMobile && <SideMenuNav desktop={false} height={sectionState.height} />}
      {chatOfSelectedConnection.messages.length > 0 && (
        <p className=" text-center text-sm font-semibold py-[1vh] text-gray-800">
          {date(chatOfSelectedConnection.messages[0].createdAt)}
          {" / "}
          {time(chatOfSelectedConnection.messages[0].createdAt)}
        </p>
      )}
      <ul className=" grid gap-y-[2vh] px-[2vw] py-[1vh] ">
        {chatOfSelectedConnection?.messages.map((message, index) => (
          <li key={index}>
            <Message
              index={index}
              message={message}
              userId={userId!}
              chatOfSelectedConnection={chatOfSelectedConnection}
            />
          </li>
        ))}
      </ul>
      <Gallery sectionState={sectionState} />
    </section>
  );
}

export default ChatScreen;
