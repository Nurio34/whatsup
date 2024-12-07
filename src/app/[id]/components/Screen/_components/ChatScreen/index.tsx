import { useAppSelector } from "@/store/hooks";
import { selectIsMoile, selectUser } from "@/store/slices/user";
import { selectChat } from "@/store/slices/chat";

import SideMenuNav from "../../../SideMenu";
import Message from "./Message";
import { ChatsUserType } from "@/type/user";

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

  return (
    <section
      className="grow relative overflow-y-auto customScrollbar"
      style={{
        backgroundImage: "url('/chat-bg.jpg')",
      }}
    >
      {isMobile && <SideMenuNav />}
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
