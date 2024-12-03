import { UserType } from "@/type/user";
import Chats from "./Chats";

function Menu({ user }: { user: UserType }) {
  return (
    <>
      <Chats user={user} />
    </>
  );
}

export default Menu;
