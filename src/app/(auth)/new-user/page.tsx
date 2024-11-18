import ProviderComponent from "@/store/Provider";
import NewUserClientPage from "./Client";

function NewUserPage() {
    return (
        <ProviderComponent>
            <NewUserClientPage />
        </ProviderComponent>
    );
}

export default NewUserPage;
