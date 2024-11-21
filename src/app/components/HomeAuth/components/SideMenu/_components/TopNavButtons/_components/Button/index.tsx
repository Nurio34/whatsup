import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function Button({ btn }: { btn: { name: string; icon: JSX.Element } }) {
    const isMobile = useAppSelector(selectIsMoile);

    const [isNameVisible, setIsNameVisible] = useState(false);

    return (
        <li key={btn.name} className="flex items-center gap-[1vh] ">
            <button
                type="button"
                className=" relative rounded-full overflow-hidden z-10 bg-white"
                onMouseEnter={() => !isMobile && setIsNameVisible(true)}
                onMouseLeave={() => !isMobile && setIsNameVisible(false)}
            >
                {btn.icon}
            </button>
            <div className=" relative h-full">
                <AnimatePresence>
                    {isNameVisible && (
                        <motion.p
                            className=" capitalize absolute w-max h-full grid place-content-center"
                            initial={{
                                x: "-50%",

                                opacity: 0,
                            }}
                            animate={{
                                x: "0",

                                opacity: 1,
                            }}
                            exit={{
                                x: "-40%",

                                opacity: 0,
                            }}
                            transition={{
                                type: "tween",
                                ease: "easeInOut",
                            }}
                        >
                            {btn.name}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </li>
    );
}

export default Button;
