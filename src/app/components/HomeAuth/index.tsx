import { UserType } from "@/type/user";
import SideMenu from "./components/SideMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function HomeAuth({ user }: { user: UserType }) {
    const router = useRouter();

    useEffect(() => {
        if (user.newUser) {
            router.push("/new-user");
            return;
        }
    }, []);

    return (
        <div>
            <SideMenu />
        </div>
    );
}

export default HomeAuth;
