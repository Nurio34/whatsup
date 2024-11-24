import ProviderComponent from "@/store/Provider";
import ChatsClient from "./Client";
import { getAllUsers } from "../actions";
import { UserType } from "@/type/user";

export type ChatsUserType = {
  avatar: {
    url: string;
  };
  username: string;
  _id: string;
  about: string;
};

async function Chats({ user }: { user: UserType }) {
  const allUsers: ChatsUserType[] = await getAllUsers();

  return (
    <ProviderComponent>
      <ChatsClient user={user} allUsers={allUsers} />
    </ProviderComponent>
  );
}

export default Chats;
