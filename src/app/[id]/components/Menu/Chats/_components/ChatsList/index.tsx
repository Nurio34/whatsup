import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectConnectWith,
  selectUser,
  setConnectWith,
} from "@/store/slices/user";

import { useEffect } from "react";
import Connection from "./Connection";

function ChatsList() {
  const user = useAppSelector(selectUser);

  const connectWith = useAppSelector(selectConnectWith);
  console.log({ connectWith });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getConnections = async () => {
      try {
        const response = await axiosInstance.get(
          `/contact/getConnections/${user?.id}`
        );

        if (response.data.status === "success") {
          dispatch(setConnectWith(response.data.connectWith));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.id) {
      getConnections();
    }
  }, [user]);

  return (
    <>
      {connectWith && connectWith.length !== 0 && (
        <ul className=" space-y-[1vh]">
          {connectWith.map((connectionId) => (
            <Connection key={connectionId} connectionId={connectionId} />
          ))}
        </ul>
      )}
    </>
  );
}

export default ChatsList;
