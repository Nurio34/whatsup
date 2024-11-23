import { IoFilter } from "react-icons/io5";
import FindNewContactButton from "./_components/FindNewContactButton";
import { ChatsUserType } from "../..";

function Header({ allUsers }: { allUsers: ChatsUserType[] }) {
  return (
    <header className=" flex justify-between items-center ">
      <h1 className=" font-semibold text-2xl">Chats</h1>
      <div className="flex items-center gap-x-[1vw]">
        <FindNewContactButton allUsers={allUsers} />
        <button
          type="button"
          className=" transition-all hover:bg-gray-200 p-[0.5vw] rounded-md"
        >
          <IoFilter size={24} />
        </button>
      </div>
    </header>
  );
}

export default Header;