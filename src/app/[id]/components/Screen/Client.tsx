"use client";

import ChatScreen from "./_components/ChatScreen";
import Header from "./_components/Header";
import MessageBar from "./_components/MessageBar";

function ScreenClient() {
  return (
    <section className=" grow">
      <Header />
      <ChatScreen />
      <MessageBar />
    </section>
  );
}

export default ScreenClient;
