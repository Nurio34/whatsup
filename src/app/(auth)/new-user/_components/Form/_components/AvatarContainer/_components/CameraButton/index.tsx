import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { FaCamera } from "react-icons/fa";

function CameraButton({
    setIsAvatarMenuVisible,
}: {
    setIsAvatarMenuVisible: Dispatch<SetStateAction<boolean>>;
}) {
    const { isMobile } = useAppSelector((s) => s.user);

    return (
        <motion.button
            type="button"
            className="absolute top-0 left-0 w-full h-full bg-[rgba(122,122,122,0.5)] rounded-full grid place-content-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "tween",
                duration: 0.3,
            }}
            onClick={() => setIsAvatarMenuVisible(true)}
        >
            <FaCamera size={isMobile ? 50 : 100} />
        </motion.button>
    );
}

export default CameraButton;
