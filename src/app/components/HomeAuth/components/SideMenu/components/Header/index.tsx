import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import CloseSideMenuButton from "./CloseSideMenuButton";

function Header() {
    const { user } = useAppSelector((s) => s.user);

    return (
        <header className=" flex items-center justify-between">
            <div className="flex gap-[1vw] items-center">
                <figure
                    className=" relative rounded-full overflow-hidden"
                    style={{
                        width:
                            (process.env.NEXT_PUBLIC_AVATAR_IMAGE_WIDTH as
                                | number
                                | undefined) || 48,
                        height:
                            (process.env.NEXT_PUBLIC_AVATAR_IMAGE_WIDTH as
                                | number
                                | undefined) || 48,
                    }}
                >
                    <Image
                        src={
                            user?.avatar ||
                            process.env.NEXT_PUBLIC_AVATAR_IMAGE ||
                            "/avatar-placeholder.webp"
                        }
                        fill
                        priority
                        alt="avatar"
                    />
                </figure>
                <p className="capitalize">{user?.username}</p>
            </div>
            <CloseSideMenuButton />
        </header>
    );
}

export default Header;
