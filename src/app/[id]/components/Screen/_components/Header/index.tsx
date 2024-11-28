import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import Avatar from "./_components/Avatar";
import ConnectionInfo from "./_components/ConnectionInfo";
import Actions from "./_components/Actions";

function Header() {
  const selectedConnection = useAppSelector(selectSelectedConnection);
  console.log({ selectedConnection });

  return (
    <header className="flex justify-start gap-x-[2vw] items-center">
      <Avatar />
      <ConnectionInfo />
      <Actions />
    </header>
  );
}

export default Header;
