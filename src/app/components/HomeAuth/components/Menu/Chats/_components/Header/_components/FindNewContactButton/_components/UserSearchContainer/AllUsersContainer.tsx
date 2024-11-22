import { ChatsUserType } from "../../../../../..";

function AllUsersContainer({ allUsers }: { allUsers: ChatsUserType[] }) {
  console.log(allUsers);

  return <div>AllUsersContainer</div>;
}

export default AllUsersContainer;
