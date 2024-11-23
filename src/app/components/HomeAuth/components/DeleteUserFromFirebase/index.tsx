import ProviderComponent from "@/store/Provider";
import DeleteUserFromFirebaseClient from "./Client";

function DeleteUserFromFirebase() {
  return (
    <ProviderComponent>
      <DeleteUserFromFirebaseClient />
    </ProviderComponent>
  );
}

export default DeleteUserFromFirebase;
