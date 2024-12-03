import { MessageType } from "@/type/message";

function Message({
  message,
  userId,
}: {
  message: MessageType;
  userId: string;
}) {
  return (
    <li
      className={`py-1 px-[1vw] rounded-md
        ${
          message.senderId === userId
            ? "justify-self-end bg-green-100"
            : "justify-self-start bg-blue-100"
        }`}
    >
      {message.message}
    </li>
  );
}

export default Message;
