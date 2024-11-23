import ProviderComponent from "@/store/Provider";
import HomeUnauthClient from "./Client";

export default function HomePage() {
  return (
    <ProviderComponent>
      <HomeUnauthClient />
    </ProviderComponent>
  );
}
