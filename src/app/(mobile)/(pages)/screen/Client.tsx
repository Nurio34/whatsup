"use client";

import { useAppSelector } from "@/store/hooks";
import ChatScreen from "./_components/ChatScreen";
import Header from "./_components/Header";
import MessageBar from "./_components/MessageBar";
import { selectSelectedConnection } from "@/store/slices/chat";
import WelcomeScreen from "./_components/WelcomeScreen";

function ScreenClient() {
  const selectedConnection = useAppSelector(selectSelectedConnection);

  return (
    <section>
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
