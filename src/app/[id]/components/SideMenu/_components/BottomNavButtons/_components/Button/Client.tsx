"use client";

import { UserType } from "@/type/user";
import { ButtonType } from ".";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { selectCurrentMenu, setCurrentMenu } from "@/store/slices/components";
import { useRouter } from "next/navigation";

function ButtonClient({ btn }: { user: UserType; btn: ButtonType }) {
  const isMobile = useAppSelector(selectIsMoile);
  const { name } = useAppSelector(selectCurrentMenu);

  const dispatch = useAppDispatch();

  const [isNameVisible, setIsNameVisible] = useState(false);

  const router = useRouter();

  return (
    <li
      key={btn.name}
      className={`flex items-center gap-[3px] py-[3px] rounded-md transition-all
        ${name === btn.name && " bg-gray-200"}  
      `}
    >
      <div className="w-[4px] h-full relative overflow-y-hidden">
        <AnimatePresence>
          {name === btn.name && (
            <motion.div className=" absolute w-full h-full bg-green-700"></motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        type="button"
        className={`relative w-7 aspect-square rounded-full overflow-hidden z-10 transition-all
            ${name === btn.name && " bg-gray-200"}  
        `}
        onMouseEnter={() => !isMobile && setIsNameVisible(true)}
        onMouseLeave={() => !isMobile && setIsNameVisible(false)}
        onClick={() => {
          dispatch(setCurrentMenu({ name: btn.name, index: btn.index }));
          if (btn.name === "profile") {
            router.push("/logout");
          }
        }}
      >
        {btn.name === "profile" ? (
          <Image
            src={
              (btn.icon as string) ||
              process.env.NEXT_PUBLIC_AVATAR_IMAGE ||
              "/avatar-placeholder.webp"
            }
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="avatar"
          />
        ) : (
          btn.icon
        )}
      </button>
      <div className=" relative h-full">
        <AnimatePresence>
          {isNameVisible && (
            <motion.p
              className=" capitalize absolute w-max h-full grid place-content-center"
              initial={{ x: "-50%", opacity: 0 }}
              animate={{ x: "0", opacity: 1 }}
              exit={{ x: "-40%", opacity: 0 }}
              transition={{
                type: "tween",
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

export default ButtonClient;
