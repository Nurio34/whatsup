import Image from "next/image";
import { ChatsUserType } from "../../../../../..";
import { AxiosError } from "axios";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectConnectWith,
  selectUser,
  setConnectWith,
} from "@/store/slices/user";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function FoundUser({ foundUser }: { foundUser: ChatsUserType | null }) {
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
        dispatch(setConnectWith(response.data.connectWith));
        toast.success(response.data.message);
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
        <div className=" flex justify-center items-center gap-x-[1vw]">
          <figure className=" grow relative aspect-square">
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
            className={`c-btn ${
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
