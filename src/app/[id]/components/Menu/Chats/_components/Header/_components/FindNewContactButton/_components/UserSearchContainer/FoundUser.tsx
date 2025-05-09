import Image from "next/image";
import { AxiosError } from "axios";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { connectIt, selectConnectWith, selectUser } from "@/store/slices/user";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setIsUserSearchContainerVisible } from "@/store/slices/components";
import { getChat } from "@/store/slices/chat";
import { ChatsUserType } from "@/type/user";

function FoundUser({
  foundUser,
  setFoundUser,
}: {
  foundUser: ChatsUserType | null;
  setFoundUser: Dispatch<SetStateAction<ChatsUserType | null>>;
}) {
  const user = useAppSelector(selectUser);
  const connectWith = useAppSelector(selectConnectWith);
  const dispatch = useAppDispatch();

  const [isFoundUserAlreadyConnected, setIsFoundUserAlreadyConnected] =
    useState(false);

  useEffect(() => {
    if (connectWith?.some((contact) => contact === foundUser?._id)) {
      setIsFoundUserAlreadyConnected(true);
    } else {
      setIsFoundUserAlreadyConnected(false);
    }
  }, [foundUser, connectWith]);

  const chat = () => {};

  const connect = async () => {
    try {
      const response = await axiosInstance(
        `/contact/connect/${user?.id}/${foundUser?._id}`
      );

      if (response.data.status === "success") {
        dispatch(connectIt(response.data.connectWith));
        dispatch(setIsUserSearchContainerVisible(false));
        setFoundUser(null);
        toast.success(response.data.message);

        dispatch(
          getChat({
            connectionId: foundUser!._id,
            messages: [],
          })
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      {foundUser && (
        <div className=" flex justify-start items-center gap-x-[1vw]">
          <figure className=" grow relative aspect-square max-w-16 rounded-full overflow-hidden">
            <Image
              src={foundUser.avatar.url}
              fill
              alt={`Avatar of ${foundUser.username}`}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </figure>
          <p>{foundUser.username}</p>
          <button
            type="button"
            className={`c-btn ml-auto ${
              isFoundUserAlreadyConnected
                ? "bg-[green] hover:bg-green-500"
                : "bg-[blue] hover:bg-blue-500"
            }`}
            onClick={isFoundUserAlreadyConnected ? chat : connect}
          >
            {isFoundUserAlreadyConnected ? "Chat" : "Connect"}
          </button>
        </div>
      )}
    </>
  );
}

export default FoundUser;
