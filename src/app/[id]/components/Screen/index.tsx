import ProviderComponent from "@/store/Provider";
import ScreenClient from "./Client";

function Screen() {
  return (
    <ProviderComponent>
      <ScreenClient />
    </ProviderComponent>
  );
}

export default Screen;
