import { IoFilter } from "react-icons/io5";
import FindNewContactButton from "./_components/FindNewContactButton";
import { ChatsUserType, UserType } from "@/type/user";
import { useAppDispatch } from "@/store/hooks";
import { setChatsMenuHeaderHeight } from "@/store/slices/components";

function Header({
  user,
  allUsers,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
}) {
  const dispatch = useAppDispatch();

  return (
    <header
      ref={(el) => {
        if (el) {
          const height = el?.getBoundingClientRect().height;
          dispatch(setChatsMenuHeaderHeight(height));
        }
      }}
      className=" flex justify-between items-center "
    >
      <h1 className=" font-semibold text-2xl pl-[5vw] md:pl-0">Chats</h1>
      <div className="flex items-center gap-x-[1vw]">
        <FindNewContactButton user={user} allUsers={allUsers} />
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
