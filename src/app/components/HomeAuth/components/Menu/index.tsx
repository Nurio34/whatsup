import { UserType } from "@/type/user";
import Chats from "./Chats";

function Menu({ user }: { user: UserType }) {
  console.log({ user });

  return (
    <section className=" border-x-4 min-w-96">
      <Chats />
    </section>
  );
}

export default Menu;
