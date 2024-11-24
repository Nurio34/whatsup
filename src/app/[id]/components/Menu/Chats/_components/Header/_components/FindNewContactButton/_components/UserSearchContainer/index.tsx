import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { AnimatePresence, motion } from "framer-motion";
import SearchUser from "./SearchUser";
import { ChatsUserType } from "../../../../../..";
import FoundUser from "./FoundUser";
import { useState } from "react";
import { UserType } from "@/type/user";

function UserSearchContainer({
  user,
  allUsers,
  isUserSearchContainerVisible,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
  isUserSearchContainerVisible: boolean;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  const [foundUser, setFoundUser] = useState<ChatsUserType | null>(null);

  return (
    <AnimatePresence>
      {isUserSearchContainerVisible && (
        <motion.aside
          className={`absolute bg-gray-100 py-[2vh] px-[2vw] rounded-lg shadow-lg w-96
            ${isMobile && " top-0 left-0 z-10 w-full max-w-96"}  
          `}
          initial={{ y: "-25%", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "-25%", opacity: 0 }}
        >
          <h2 className=" font-semibold text-xl">New Contact</h2>
          <div className=" text-sm">
            {isMobile ? (
              <div>
                <p>Type the username and click Search Button.</p>
                <p>You have to know exact username fo find it.</p>
              </div>
            ) : (
              <div>
                <p>Type the username and press Enter.</p>
                <p>You have to know exact username fo find it.</p>
              </div>
            )}
          </div>
          <SearchUser
            user={user}
            allUsers={allUsers}
            setFoundUser={setFoundUser}
          />
          <FoundUser foundUser={foundUser} />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default UserSearchContainer;
