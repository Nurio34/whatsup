"use client";

import { useAppSelector } from "@/store/hooks";
import ChatScreen from "./_components/ChatScreen";
import Header from "./_components/Header";
import MessageBar from "./_components/MessageBar";
import { selectChat, selectSelectedConnection } from "@/store/slices/chat";
import WelcomeScreen from "./_components/WelcomeScreen";
import { selectIsMoile } from "@/store/slices/user";
import { usePathname } from "next/navigation";

function ScreenClient() {
  const selectedConnection = useAppSelector(selectSelectedConnection);
  const isMobile = useAppSelector(selectIsMoile);
  const chat = useAppSelector(selectChat);

  const path = usePathname().split("/")[1];
  const mobileCondition = isMobile && path !== "screen";

  return (
    <section className={`${mobileCondition ? "hidden" : "grow"}`}>
      {selectedConnection ? (
        <div className=" w-full h-screen flex flex-col">
          <Header selectedConnection={selectedConnection} />
          <ChatScreen selectedConnection={selectedConnection} />
          <MessageBar />
        </div>
      ) : (
        <WelcomeScreen />
      )}
    </section>
  );
}

export default ScreenClient;
