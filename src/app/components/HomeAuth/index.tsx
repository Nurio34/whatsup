import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectUser } from "@/store/slices/user";
import { useAppSelector } from "@/store/hooks";
import SideMenuNav from "./components/SideMenu";
import Menu from "./components/Menu";
import Screen from "./components/Screen";

function HomeAuth() {
    const user = useAppSelector(selectUser);
    const router = useRouter();

    useEffect(() => {
        if (user?.newUser) {
            router.push("/new-user");
            return;
        }
    }, [user]);

    return (
        <main className="grid grid-cols-[auto,0.2fr,0.8fr]">
            <SideMenuNav />
            <Menu />
            <Screen />
        </main>
    );
}

export default HomeAuth;
