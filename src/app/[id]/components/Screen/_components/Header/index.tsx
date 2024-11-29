import { useAppSelector } from "@/store/hooks";
import { selectSelectedConnection } from "@/store/slices/chat";
import Avatar from "./_components/Avatar";
import ConnectionInfo from "./_components/ConnectionInfo";
import Actions from "./_components/Actions";

function Header() {
  const selectedConnection = useAppSelector(selectSelectedConnection);

  if (selectedConnection) {
    const { _id: id, username, about, avatar } = selectedConnection;
    console.log({ selectedConnection });
    console.log({ id, about });

    return (
      <header className="flex justify-start gap-x-[1vw] items-center py-[1vh] px-[1vw]">
        <Avatar avatar={avatar.url} />
        <ConnectionInfo username={username} />
        <Actions />
      </header>
    );
  }
}

export default Header;
