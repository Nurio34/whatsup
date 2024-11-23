import { GrUserAdd } from "react-icons/gr";
import UserSearchContainer from "./_components/UserSearchContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsUserSearchContainerVisible,
  setIsUserSearchContainerVisible,
} from "@/store/slices/components";
import { ChatsUserType } from "../../../..";

function FindNewContactButton({ allUsers }: { allUsers: ChatsUserType[] }) {
  const isUserSearchContainerVisible = useAppSelector(
    selectIsUserSearchContainerVisible
  );

  const dispatch = useAppDispatch();

  const openUserSearchContainer = () =>
    dispatch(setIsUserSearchContainerVisible(!isUserSearchContainerVisible));

  return (
    <div>
      <button
        type="button"
        className=" transition-all hover:bg-gray-200 p-[0.5vw] rounded-md"
        onClick={openUserSearchContainer}
      >
        <GrUserAdd size={24} />
      </button>
      <UserSearchContainer
        allUsers={allUsers}
        isUserSearchContainerVisible={isUserSearchContainerVisible}
      />
    </div>
  );
}

export default FindNewContactButton;
