import { useAppSelector } from "@/store/hooks";
import { selectIsMoile } from "@/store/slices/user";
import { AnimatePresence, motion } from "framer-motion";
import SearchUser from "./SearchUser";
import FoundUser from "./FoundUser";
import { Dispatch, SetStateAction } from "react";
import { ChatsUserType, UserType } from "@/type/user";

function UserSearchContainer({
  user,
  allUsers,
  isUserSearchContainerVisible,
  foundUser,
  setFoundUser,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
  isUserSearchContainerVisible: boolean;
  foundUser: ChatsUserType | null;
  setFoundUser: Dispatch<SetStateAction<ChatsUserType | null>>;
}) {
  const isMobile = useAppSelector(selectIsMoile);

  return (
    <AnimatePresence>
      {isUserSearchContainerVisible && (
        <motion.aside
          className={`z-50 bg-gray-100 py-[2vh] px-[2vw] rounded-lg shadow-lg
            ${
              isMobile
                ? "fixed top-0 left-1/2 w-80"
                : "absolute left-0 min-w-96"
            }  
          `}
          initial={{
            y: "-25%",
            opacity: 0,
            translateX: isMobile ? "-50%" : "0%",
          }}
          animate={{ y: "0", opacity: 1, translateX: isMobile ? "-50%" : "0%" }}
          exit={{
            y: "-12.5%",
            opacity: 0,
            translateX: "-50%",
            transition: { duration: 0.1 },
          }}
        >
          <h2 className=" font-semibold text-xl">New Contact</h2>
          <ul className=" text-sm list-disc list-inside">
            {isMobile ? (
              <li>Type the username and click Search Button.</li>
            ) : (
              <li>Type the username and press Enter.</li>
            )}
            <li>You have to know exact username fo find it.</li>
            <li>It is case sensetive</li>
          </ul>
          <SearchUser
            user={user}
            allUsers={allUsers}
            setFoundUser={setFoundUser}
          />
          <FoundUser foundUser={foundUser} setFoundUser={setFoundUser} />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default UserSearchContainer;
