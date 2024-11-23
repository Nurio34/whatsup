import ProviderComponent from "@/store/Provider";
import LogoutClient from "./Client";

function Logout() {
  return (
    <ProviderComponent>
      <LogoutClient />
    </ProviderComponent>
  );
}

export default Logout;
