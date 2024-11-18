import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCamera } from "react-icons/fa";
import AvatarMenu from "./_components/AvatarMenu";
import CameraButton from "./_components/CameraButton";
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
