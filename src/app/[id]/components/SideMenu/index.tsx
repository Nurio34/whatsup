import ProviderComponent from "@/store/Provider";
import SideMenuNavClient from "./Client";

function SideMenuNav() {
  return (
    <ProviderComponent>
      <SideMenuNavClient />
    </ProviderComponent>
  );
}

export default SideMenuNav;
