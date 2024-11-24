import { GrUserAdd } from "react-icons/gr";
import UserSearchContainer from "./_components/UserSearchContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsUserSearchContainerVisible,
  setIsUserSearchContainerVisible,
} from "@/store/slices/components";
import { ChatsUserType } from "../../../..";
import { UserType } from "@/type/user";
import { useEffect } from "react";

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

  const dispatch = useAppDispatch();

  const openUserSearchContainer = () =>
    dispatch(setIsUserSearchContainerVisible(!isUserSearchContainerVisible));

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
      }
    };

    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("click", close);
    };
  }, [dispatch]);

  return (
    <div id="FindNewContactButton">
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
      />
    </div>
  );
}

export default FindNewContactButton;
