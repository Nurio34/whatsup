import ProviderComponent from "@/store/Provider";
import HomeUnauthClient from "./Client";

function HomeUnauth() {
    return (
        <ProviderComponent>
        <HomeUnauthClient/>
    </ProviderComponent>
    )
}

export default HomeUnauth;
