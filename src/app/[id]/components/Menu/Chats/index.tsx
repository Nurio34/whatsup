import ProviderComponent from "@/store/Provider";
import ChatsClient from "./Client";
import { getAllUsers } from "../actions";
import { ChatsUserType, UserType } from "@/type/user";

async function Chats({ user }: { user: UserType }) {
  const allUsers: ChatsUserType[] = await getAllUsers();

  return (
    <ProviderComponent>
      <ChatsClient user={user} allUsers={allUsers} />
    </ProviderComponent>
  );
}

export default Chats;
