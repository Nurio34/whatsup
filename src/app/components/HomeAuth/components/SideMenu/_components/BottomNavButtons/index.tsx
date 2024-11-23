import { LiaArchiveSolid, LiaStar } from "react-icons/lia";
import { TfiSettings } from "react-icons/tfi";
import Button from "./_components/Button";
import { UserType } from "@/type/user";
import { Suspense } from "react";
import Skeleton from "./_components/Button/Skeleton";

function BottomNavButtons({ user }: { user: UserType }) {
  const bottomNavButtons = [
    {
      name: "stared-messages",
      index: 4,
      icon: <LiaStar size={28} />,
    },
    {
      name: "archived-chats",
      index: 5,
      icon: <LiaArchiveSolid size={28} />,
    },
    {
      name: "settings",
      index: 6,
      icon: <TfiSettings size={28} />,
    },
    {
      name: "profile",
      index: 7,
      icon: user.avatar.url,
    },
  ];

  return (
    <ul className={` self-end md:self-center grid gap-y-[3px]`}>
      {bottomNavButtons.map((btn) => (
        <Suspense key={btn.name} fallback={<Skeleton />}>
          <Button user={user} btn={btn} />
        </Suspense>
      ))}
    </ul>
  );
}

export default BottomNavButtons;
