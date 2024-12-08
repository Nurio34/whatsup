import ProviderComponent from "@/store/Provider";
import ChatsClient from "./Client";

async function Chats() {
  return (
    <ProviderComponent>
      <ChatsClient />
    </ProviderComponent>
  );
}

export default Chats;
