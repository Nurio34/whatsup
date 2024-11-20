import ProviderComponent from "@/store/Provider";
import DeviceDetectorClient from "./Client";

function DeviceDetector() {
    return (
        <ProviderComponent>
            <DeviceDetectorClient />
        </ProviderComponent>
    );
}

export default DeviceDetector;
