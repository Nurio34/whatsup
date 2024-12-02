import Avatar from "./_components/Avatar";
import ConnectionInfo from "./_components/ConnectionInfo";
import Actions from "./_components/Actions";
import { ChatsUserType } from "@/app/[id]/components/Menu/Chats";

function Header({ selectedConnection }: { selectedConnection: ChatsUserType }) {
  const { _id: id, username, about, avatar } = selectedConnection;
  console.log({ id, about });

  return (
    <header className="flex justify-start gap-x-[1vw] items-center py-[1vh] px-[1vw]">
      <Avatar avatar={avatar.url} />
      <ConnectionInfo username={username} />
      <Actions />
    </header>
  );
}

export default Header;
