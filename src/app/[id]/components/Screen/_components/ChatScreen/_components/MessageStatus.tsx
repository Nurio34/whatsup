import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/user";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({
  status,
  senderId,
}: {
  status: string;
  senderId: string;
}) {
  const user = useAppSelector(selectUser);
  const userId = user && user.id;

  return (
    <>
      {userId === senderId && (
        <span>
          {status === "sent" ? (
            <BsCheck size={20} className=" text-gray-500" />
          ) : (
            <BsCheckAll
              size={20}
              className={`${
                status === "delivered" ? "text-gray-500" : "text-blue-500"
              }`}
            />
          )}
        </span>
      )}
    </>
  );
}

export default MessageStatus;
