import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import CameraButton from "../CameraButton";
import { Dispatch, SetStateAction } from "react";

function AvatarPicture({
    avatar,
    isCameraButtonVisible,
    setIsCameraButtonVisible,
    setIsAvatarMenuVisible,
}: {
    avatar: string;
    isCameraButtonVisible: boolean;
    setIsCameraButtonVisible: Dispatch<SetStateAction<boolean>>;
    setIsAvatarMenuVisible: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <motion.div
            className=" relative self-center justify-self-stretch  rounded-full overflow-hidden aspect-square"
            onMouseEnter={() => setIsCameraButtonVisible(true)}
            onMouseLeave={() => setIsCameraButtonVisible(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Image src={avatar} fill alt="Avatar" />
            <AnimatePresence>
                {isCameraButtonVisible && (
                    <CameraButton
                        setIsAvatarMenuVisible={setIsAvatarMenuVisible}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AvatarPicture;
