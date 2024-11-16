import ProviderComponent from "@/store/Provider";
import HeaderClient from "./Client";

function Header() {
    return (
        <ProviderComponent>
            <HeaderClient />
        </ProviderComponent>
    );
}

export default Header;
