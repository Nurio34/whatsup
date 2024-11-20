import { useAppSelector } from "@/store/hooks";
import { motion } from "framer-motion";
import Image from "next/image";

function FloatingIcons() {
    const { isMobile } = useAppSelector((s) => s.user);
    console.log({ isMobile });

    const icons = [
        {
            src: "/icons/icon-1.webp",
            label: "icon-1",
            top: 30,
            left: isMobile ? 0 : -32,
            delay: "0s",
            duration: "6s",
        },
        {
            src: "/icons/icon-2.webp",
            label: "icon-2",
            top: 0,
            left: 240,
            delay: "1s",
            duration: "7s",
        },
        {
            src: "/icons/icon-3.webp",
            label: "icon-3",
            top: isMobile ? 150 : 180,
            left: isMobile ? 130 : 100,
            delay: "2s",
            duration: "8s",
        },
    ];

    return (
        <motion.div
            key="icons"
            className=" w-full h-full absolute "
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{
                duration: 1,
                type: "tween",
                staggerChildren: 0.2,
            }}
        >
            {icons.map((icon, index) => (
                <Image
                    key={index}
                    src={icon.src}
                    width={120}
                    height={120}
                    priority
                    alt={icon.label}
                    className={`Icon absolute `}
                    style={
                        {
                            "--delay": icon.delay,
                            "--duration": icon.duration,
                            top: icon.top,
                            left: icon.left,
                        } as React.CSSProperties
                    }
                />
            ))}
        </motion.div>
    );
}

export default FloatingIcons;
