import { useRef, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";

function SearchUser() {
  const SearchInput = useRef<HTMLInputElement | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <div
      className="flex justify-center border-[1px] rounded-md transition-all my-[1vh] overflow-hidden bg-white "
      style={{
        boxShadow: isSearchFocused ? "0 12px 5px -10px green" : "",
      }}
    >
      <button type="button" className="px-[1vw]">
        <LiaSearchSolid />
      </button>
      <input
        ref={SearchInput}
        type="text"
        name="search"
        id="search"
        className="grow py-1 outline-none"
        placeholder="Find a chat ..."
        autoComplete="off"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
    </div>
  );
}

export default SearchUser;
