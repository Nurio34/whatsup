"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCurrentMenu } from "@/store/slices/components";
import Header from "./_components/Header";
import SearchChat from "./_components/SearchChat";
import { ChatsUserType } from ".";
import { UserType } from "@/type/user";
import ChatsList from "./_components/ChatsList";

function ChatsClient({
  user,
  allUsers,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
}) {
  const { name } = useAppSelector(selectCurrentMenu);

  return (
    <>
      {name === "chats" && (
        <div className=" py-[2vh] px-[2vw]">
          <Header user={user} allUsers={allUsers} />
          <SearchChat />
          <ChatsList />
        </div>
      )}
    </>
  );
}

export default ChatsClient;
