import { GiMatterStates } from "react-icons/gi";
import { PiChatCircleText, PiPhoneCall } from "react-icons/pi";
import Button from "./_components/Button";

function TopNavButtons({ isMobile }: { isMobile: boolean }) {
    const topNavButtons = [
        {
            name: "chats",
            icon: <PiChatCircleText size={28} />,
        },
        {
            name: "calls",
            icon: <PiPhoneCall size={28} />,
        },
        {
            name: "status",
            icon: <GiMatterStates size={28} />,
        },
    ];
    return (
        <ul
            className={`${isMobile && " self-start"}
                grid  gap-y-[1vh]
            `}
        >
            {topNavButtons.map((btn) => (
                <Button key={btn.name} btn={btn} />
            ))}
        </ul>
    );
}

export default TopNavButtons;
