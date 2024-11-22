import { GiMatterStates } from "react-icons/gi";
import { PiChatCircleText, PiPhoneCall } from "react-icons/pi";
import Button from "./_components/Button";
import { UserType } from "@/type/user";

function TopNavButtons({ user }: { user: UserType }) {
  const topNavButtons = [
    {
      name: "chats",
      index: 1,
      icon: <PiChatCircleText size={28} />,
    },
    {
      name: "calls",
      index: 2,
      icon: <PiPhoneCall size={28} />,
    },
    {
      name: "status",
      index: 3,
      icon: <GiMatterStates size={28} />,
    },
  ];
  return (
    <ul className={`self-start min-w-max md:self-center grid  gap-y-[3px]`}>
      {topNavButtons.map((btn) => (
        <Button key={btn.name} user={user} btn={btn} />
      ))}
    </ul>
  );
}

export default TopNavButtons;
