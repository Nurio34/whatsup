"use client";

import { useAppSelector } from "@/store/hooks";
import {
  selectCurrentMenu,
  selectRenderedComponent,
} from "@/store/slices/components";
import Header from "./_components/Header";
import SearchChat from "./_components/SearchChat";
import { ChatsUserType } from ".";
import { UserType } from "@/type/user";
import ChatsList from "./_components/ChatsList";
import { selectIsMoile } from "@/store/slices/user";

function ChatsClient({
  user,
  allUsers,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
}) {
  const { name } = useAppSelector(selectCurrentMenu);
  const isMobile = useAppSelector(selectIsMoile);
  const renderedComponent = useAppSelector(selectRenderedComponent);

  const mobileCondition =
    (name === "chats" && isMobile && renderedComponent === "menu") ||
    (name === "chats" && !isMobile);

  return (
    <>
      {mobileCondition && (
        <div className={`py-[2vh] px-[2vw]  border-x-4 w-full md:w-96`}>
          <Header user={user} allUsers={allUsers} />
          <SearchChat />
          <ChatsList />
        </div>
      )}
    </>
  );
}

export default ChatsClient;
