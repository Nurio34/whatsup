import { UserType } from "@/type/user";
import Chats from "./Chats";

function Menu({ user }: { user: UserType }) {
  return (
    <section className=" border-x-4 w-full md:w-96">
      <Chats user={user} />
    </section>
  );
}

export default Menu;
