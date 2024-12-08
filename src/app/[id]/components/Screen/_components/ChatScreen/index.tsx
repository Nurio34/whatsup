import { useAppSelector } from "@/store/hooks";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import { selectChat } from "@/store/slices/chat";

import SideMenuNav from "../../../SideMenu";
import Message from "./Message";
import { ChatsUserType } from "@/type/user";
import { useEffect, useRef, useState } from "react";
import { date } from "@/utils/date";
import { time } from "@/utils/time";

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

  const [sectionHeight, setSectionHeight] = useState(0);
  const SectionElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleSectionHeight = () => {
      if (SectionElement.current) {
        const height = SectionElement.current.getBoundingClientRect().height;
        setSectionHeight(height);
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
      {isMobile && <SideMenuNav desktop={false} height={sectionHeight} />}
      <p className=" text-center text-sm font-semibold py-[1vh] text-gray-800">
        {date(chatOfSelectedConnection.messages[0].createdAt)}
        {" / "}
        {time(chatOfSelectedConnection.messages[0].createdAt)}
      </p>
      <ul className=" grid gap-y-[2vh] px-[2vw] py-[1vh] ">
        {chatOfSelectedConnection?.messages.map((message, index) => (
          <Message
            key={index}
            index={index}
            message={message}
            userId={userId!}
            chatOfSelectedConnection={chatOfSelectedConnection}
          />
        ))}
      </ul>
    </section>
  );
}

export default ChatScreen;
