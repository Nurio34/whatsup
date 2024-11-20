import { AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AvatarMenu from "./_components/AvatarMenu";
import AvatarPicture from "./_components/AvatarPicture";

function AvatarContainer({
    avatar,
    setAvatar,
    setAvatarFile,
    isMobile,
}: {
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
    setAvatarFile: Dispatch<SetStateAction<File | null>>;
    isMobile: boolean;
}) {
    const [isCameraButtonVisible, setIsCameraButtonVisible] = useState(false);
    const [isAvatarMenuVisible, setIsAvatarMenuVisible] = useState(false);

    useEffect(() => {
        setIsCameraButtonVisible(false);
    }, [avatar]);

    return (
        <AnimatePresence mode="wait">
            {!isAvatarMenuVisible ? (
                <AvatarPicture
                    avatar={avatar}
                    isCameraButtonVisible={isCameraButtonVisible}
                    setIsCameraButtonVisible={setIsCameraButtonVisible}
                    setIsAvatarMenuVisible={setIsAvatarMenuVisible}
                />
            ) : (
                <AvatarMenu
                    setIsAvatarMenuVisible={setIsAvatarMenuVisible}
                    setAvatar={setAvatar}
                    setIsCameraButtonVisible={setIsCameraButtonVisible}
                    setAvatarFile={setAvatarFile}
                    isMobile={isMobile}
                />
            )}
        </AnimatePresence>
    );
}

export default AvatarContainer;
