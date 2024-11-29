import { GrUserAdd } from "react-icons/gr";
import UserSearchContainer from "./_components/UserSearchContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsUserSearchContainerVisible,
  setIsUserSearchContainerVisible,
} from "@/store/slices/components";
import { ChatsUserType } from "../../../..";
import { UserType } from "@/type/user";
import { useEffect, useState } from "react";
import "./index.css";
import { selectConnectWith } from "@/store/slices/user";

function FindNewContactButton({
  user,
  allUsers,
}: {
  user: UserType;
  allUsers: ChatsUserType[];
}) {
  const isUserSearchContainerVisible = useAppSelector(
    selectIsUserSearchContainerVisible
  );
  const connectWith = useAppSelector(selectConnectWith);

  const dispatch = useAppDispatch();

  const openUserSearchContainer = () =>
    dispatch(setIsUserSearchContainerVisible(!isUserSearchContainerVisible));

  const [foundUser, setFoundUser] = useState<ChatsUserType | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const FindNewContactButton = document.querySelector(
        "#FindNewContactButton"
      );

      if (
        e.target === FindNewContactButton ||
        FindNewContactButton?.contains(e.target as Node)
      ) {
        return;
      } else {
        dispatch(setIsUserSearchContainerVisible(false));
        setFoundUser(null);
      }
    };

    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("click", close);
    };
  }, [dispatch]);

  return (
    <div
      id="FindNewContactButton"
      className={`relative rounded-md
      ${!Boolean(connectWith) && "highlighted"}
    `}
    >
      <button
        type="button"
        className=" transition-all hover:bg-gray-200 p-[0.5vw] rounded-md"
        onClick={openUserSearchContainer}
      >
        <GrUserAdd size={24} />
      </button>
      <UserSearchContainer
        user={user}
        allUsers={allUsers}
        isUserSearchContainerVisible={isUserSearchContainerVisible}
        foundUser={foundUser}
        setFoundUser={setFoundUser}
      />
    </div>
  );
}

export default FindNewContactButton;
