import ProviderComponent from "@/store/Provider";
import ChatsClient from "./Client";
import { getAllUsers } from "../actions";

export type ChatsUserType = {
  avatar: {
    url: string;
  };
  username: string;
  _id: string;
};

async function Chats() {
  const allUsers: ChatsUserType[] = await getAllUsers();

  return (
    <ProviderComponent>
      <ChatsClient allUsers={allUsers} />
    </ProviderComponent>
  );
}

export default Chats;
