import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsSideMenuOpen } from "@/store/slices/components";
import Image from "next/image";

function SideMenuButton() {
    const { user } = useAppSelector((s) => s.user);
    const dispatch = useAppDispatch();

    const openSideMenu = () => dispatch(setIsSideMenuOpen(true));

    return (
        <div className=" grid place-content-center">
            <button type="button" onClick={openSideMenu}>
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
                            user?.avatar.url ||
                            process.env.NEXT_PUBLIC_AVATAR_IMAGE ||
                            "/avatar-placeholder.webp"
                        }
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        priority
                        alt="avatar"
                    />
                </figure>
            </button>
        </div>
    );
}

export default SideMenuButton;
