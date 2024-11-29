import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectConnectWith,
  selectUser,
  setConnectWith,
} from "@/store/slices/user";
import { useEffect, useState } from "react";
import Connection from "./Connection";
import { Hourglass } from "react-loader-spinner";
import { BiSolidErrorCircle } from "react-icons/bi";
import { AxiosError } from "axios";

function ChatsList() {
  const user = useAppSelector(selectUser);
  const connectWith = useAppSelector(selectConnectWith);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getConnections = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `/contact/getConnections/${user?.id}`
      );

      if (response.data.status === "success") {
        dispatch(setConnectWith(response.data.connectWith));
      }
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.status === "error"
      ) {
        setError(
          "Something went wrong while getting your connection. Push the button to try to get your connections again !"
        );
        return;
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getConnections();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full min-h-96 grid place-content-center justify-items-center gap-y-[1vh]">
        <Hourglass ariaLabel="hourglass-loading" />
        <p>Please wait ...</p>
        <p>Getting your Connections.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-96 grid place-content-center justify-items-center gap-y-[1vh]">
        <BiSolidErrorCircle color="red" size={56} />
        <p className=" text-gray-600 font-serif font-semibold text-center">
          {error}
        </p>
        <button
          type="button"
          className={`${
            !isLoading ? "c-btn bg-[blue] hover:bg-blue-500" : "c-d-btn"
          }`}
          onClick={getConnections}
          disabled={isLoading}
        >
          Get Connections
        </button>
      </div>
    );
  }

  return (
    <>
      {connectWith && connectWith.length !== 0 ? (
        <ul className=" space-y-[1vh] ">
          {connectWith.map((connectionId) => (
            <Connection key={connectionId} connectionId={connectionId} />
          ))}
        </ul>
      ) : (
        <p className=" text-sm text-gray-500">You have no connection yet !</p>
      )}
    </>
  );
}

export default ChatsList;
