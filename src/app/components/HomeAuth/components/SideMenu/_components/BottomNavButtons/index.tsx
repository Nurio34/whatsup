import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/user";
import { LiaArchiveSolid, LiaStar } from "react-icons/lia";
import { TfiSettings } from "react-icons/tfi";
import Button from "./_components/Button";

function BottomNavButtons({ isMobile }: { isMobile: boolean }) {
    const user = useAppSelector(selectUser);

    const bottomNavButtons = [
        {
            name: "stared-messages",
            icon: <LiaStar size={28} />,
        },
        {
            name: "archived-chats",
            icon: <LiaArchiveSolid size={28} />,
        },
        {
            name: "settings",
            icon: <TfiSettings size={28} />,
        },
        {
            name: "profile",
            icon: user?.avatar.url,
        },
    ];

    return (
        <ul
            className={`${isMobile && " self-end"}
                grid gap-y-[1vh]
            `}
        >
            {bottomNavButtons.map((btn) => (
                <Button key={btn.name} btn={btn} />
            ))}
        </ul>
    );
}

export default BottomNavButtons;
