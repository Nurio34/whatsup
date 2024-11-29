import { ChatsUserType } from "@/app/[id]/components/Menu/Chats";
import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { UserType } from "@/type/user";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { ImSearch } from "react-icons/im";
import { LiaSearchSolid } from "react-icons/lia";

function SearchUser({
  user,
  allUsers,
  setFoundUser,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
  setFoundUser: Dispatch<SetStateAction<ChatsUserType | null>>;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  const SearchInput = useRef<HTMLInputElement | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchedUser, setSearchedUser] = useState("");

  const searchUserWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const anyUser = allUsers.find((user) => user.username === searchedUser);

      if (anyUser && searchedUser !== user.username) {
        setFoundUser(anyUser);
        setSearchedUser("");
      }
    }
  };

  const searchUserWithIconButton = () => {
    const anyUser = allUsers.find((user) => user.username === searchedUser);
    if (anyUser && searchedUser !== user.username) {
      setFoundUser(anyUser);
      setSearchedUser("");
    }
  };

  return (
    <div
      className="flex justify-center border-[1px] rounded-md transition-all my-[1vh] overflow-hidden bg-white "
      style={{
        boxShadow: isSearchFocused ? "0 12px 5px -10px green" : "",
      }}
    >
      <button
        type="button"
        className={`px-[2.6vw] md:px-[0.5vw] 
          ${isMobile && "order-1"}  
        `}
        onClick={searchUserWithIconButton}
      >
        {isMobile ? (
          <ImSearch style={{ filter: "drop-shadow(0 0 1px  black)" }} />
        ) : (
          <LiaSearchSolid />
        )}
      </button>
      <input
        ref={SearchInput}
        type="text"
        name="search"
        id="search"
        className={`grow py-1 outline-none
          ${isMobile && "pl-[3vw]"}  
        `}
        placeholder="Find a chat ..."
        autoComplete="off"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        onKeyDown={searchUserWithKeyboard}
        value={searchedUser}
        onChange={(e) => setSearchedUser(e.target.value)}
        autoFocus
      />
    </div>
  );
}

export default SearchUser;
