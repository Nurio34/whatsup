import BottomNavButtons from "./_components/BottomNavButtons";
import TopNavButtons from "./_components/TopNavButtons";
import { UserType } from "@/type/user";

async function SideMenuNav({ user }: { user: UserType }) {
  return (
    <nav
      className={`h-screen py-[2vh] px-[1vw] min-w-[43.0312px] md:min-w-[69.1719px]
            grid items-center transition-all
            `}
    >
      <TopNavButtons user={user} />
      <BottomNavButtons user={user} />
    </nav>
  );
}

export default SideMenuNav;
