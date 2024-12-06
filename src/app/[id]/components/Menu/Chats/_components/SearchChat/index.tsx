import { useAppDispatch } from "@/store/hooks";
import { setChatsSearchChatHeight } from "@/store/slices/components";
import { useRef, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";

function SearchChat() {
  const SearchInput = useRef<HTMLInputElement | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div
      ref={(el) => {
        if (el) {
          const height = el.getBoundingClientRect().height;
          dispatch(setChatsSearchChatHeight(height));
        }
      }}
      className="flex justify-center border-[1px] rounded-md transition-all my-[1vh] "
      style={{
        boxShadow: isSearchFocused ? "0 12px 5px -10px green" : "",
      }}
    >
      <button type="button" className="pl-[1vw]">
        <LiaSearchSolid />
      </button>
      <input
        ref={SearchInput}
        type="text"
        name="search"
        id="search"
        className="grow py-1 px-[1vw] outline-none"
        placeholder="Find a chat ..."
        autoComplete="off"
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />
    </div>
  );
}

export default SearchChat;
