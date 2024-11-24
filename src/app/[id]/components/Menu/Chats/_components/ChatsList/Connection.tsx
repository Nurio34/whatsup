import { useEffect, useState } from "react";
import { ChatsUserType } from "../..";
import axiosInstance from "@/axios";
import Image from "next/image";

function Connection({ connectionId }: { connectionId: string }) {
  const [connection, setConnection] = useState<ChatsUserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return <p>Loading..</p>;
  }

  return (
    <>
      {connection && (
        <li className="flex items-center gap-x-[1vw] bg-gray-100 rounded-lg px-[1vw] py-[1vh] ">
          <figure className=" relative min-w-20 aspect-square rounded-full overflow-hidden">
            <Image
              src={connection.avatar.url}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              alt={`Avatar of ${connection.username}`}
              priority
            />
          </figure>
          <div className="grid">
            <p>{connection.username}</p>
            <p className="truncate">
              {connection.about || `Hey it's ${connection.username}`}
            </p>
          </div>
        </li>
      )}
    </>
  );
}

export default Connection;
