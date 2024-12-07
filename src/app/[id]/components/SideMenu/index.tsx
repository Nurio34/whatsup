import ProviderComponent from "@/store/Provider";
import SideMenuNavClient from "./Client";

function SideMenuNav({
  desktop,
  height,
}: {
  desktop: boolean;
  height?: number;
}) {
  return (
    <ProviderComponent>
      <SideMenuNavClient desktop={desktop} height={height} />
    </ProviderComponent>
  );
}

export default SideMenuNav;
