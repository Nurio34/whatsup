"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentMenu } from "@/store/slices/components";
import Header from "./_components/Header";
import SearchChat from "./_components/SearchChat";
import { ChatsUserType } from ".";

function ChatsClient({ allUsers }: { allUsers: ChatsUserType[] }) {
  const { name } = useAppSelector(selectCurrentMenu);

  return (
    <>
      {name === "chats" && (
        <div className=" py-[2vh] px-[2vw]">
          <Header allUsers={allUsers} />
          <SearchChat />
        </div>
      )}
    </>
  );
}

export default ChatsClient;
