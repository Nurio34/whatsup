import { useEffect, useState } from "react";
import { ChatsUserType } from "../..";
import axiosInstance from "@/axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedConnection } from "@/store/slices/chat";

function Connection({ connectionId }: { connectionId: string }) {
  const [connection, setConnection] = useState<ChatsUserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isSecondAnimation, setIsSecondAnimation] = useState(false);
  const [isThirdAnimation, setIsThirdAnimation] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getConnection = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance(
          `/contact/getConnection/${connectionId}`
        );

        if (response.data.status === "success") {
          setConnection(response.data.connection);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getConnection();
  }, [connectionId]);

  const handleSelectConnection = () => {
    if (connection) {
      dispatch(setSelectedConnection(connection));
    }
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <>
      {connection && (
        <motion.li
          className=" bg-gray-100 border-2 shadow-md  rounded-md px-[1vw] py-[1vh]"
          initial={{ x: "-25%" }}
          animate={
            !isSecondAnimation
              ? { x: "0" }
              : isSecondAnimation && !isThirdAnimation
              ? {
                  filter:
                    "drop-shadow(0 0 4px blue) drop-shadow(0 0 8px blue) drop-shadow(0 0 12px blue)",
                  transition: { type: "tween", ease: "easeOut" },
                }
              : {
                  x: 0,
                  filter: "drop-shadow(0 0 0 transparent)",
                  transition: { type: "tween", duration: 1.6 },
                }
          }
          onAnimationComplete={() => {
            if (!isSecondAnimation) {
              setIsSecondAnimation(true);
            } else if (isSecondAnimation && !isThirdAnimation) {
              setIsSecondAnimation(false);
              setIsThirdAnimation(true);
            } else {
              console.log("finish");
            }
          }}
        >
          <button
            type="button"
            className="flex items-center  gap-x-[1vw] w-full"
            onClick={handleSelectConnection}
          >
            <figure className=" relative min-w-20 aspect-square rounded-full overflow-hidden">
              <Image
                src={connection.avatar.url}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={`Avatar of ${connection.username}`}
                priority
              />
            </figure>
            <div className="grow grid justify-items-start">
              <p className=" font-semibold text-lg text-gray-800">
                {connection.username}
              </p>
              <p className=" truncate text-sm text-gray-500">
                {connection.about || `Hey it's ${connection.username} `}
              </p>
            </div>
          </button>
        </motion.li>
      )}
    </>
  );
}

export default Connection;
