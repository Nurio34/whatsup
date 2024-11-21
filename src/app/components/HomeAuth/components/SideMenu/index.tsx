import { useAppSelector } from "@/store/hooks";
import BottomNavButtons from "./_components/BottomNavButtons";
import TopNavButtons from "./_components/TopNavButtons";
import { selectIsMoile } from "@/store/slices/user";

function SideMenuNav() {
    const isMobile = useAppSelector(selectIsMoile);

    return (
        <nav
            className={`h-screen py-[2vh] px-[2vw]
            grid items-center transition-all
            `}
        >
            <TopNavButtons isMobile={isMobile} />
            <BottomNavButtons isMobile={isMobile} />
        </nav>
    );
}

export default SideMenuNav;
