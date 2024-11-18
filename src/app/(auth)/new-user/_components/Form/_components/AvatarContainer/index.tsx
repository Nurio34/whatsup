import { AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import AvatarMenu from "./_components/AvatarMenu";
import AvatarPicture from "./_components/AvatarPicture";

function AvatarContainer({
    avatar,
    setAvatar,
    setAvatarFile,
}: {
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
    setAvatarFile: Dispatch<SetStateAction<File | null>>;
}) {
    const [isCameraButtonVisible, setIsCameraButtonVisible] = useState(false);
    const [isAvatarMenuVisible, setIsAvatarMenuVisible] = useState(false);

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
                />
            )}
        </AnimatePresence>
    );
}

export default AvatarContainer;
