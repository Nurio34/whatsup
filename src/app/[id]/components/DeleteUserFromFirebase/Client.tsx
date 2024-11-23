"use client";

import useDeleteUserFromFirebase from "@/hooks/useDeleteUserFromFirebase";
import { useAppSelector } from "@/store/hooks";
import { selectIsUserDeletedFromFirebase } from "@/store/slices/user";

function DeleteUserFromFirebaseClient() {
  const isUserDeletedFromFirebase = useAppSelector(
    selectIsUserDeletedFromFirebase
  );
  useDeleteUserFromFirebase(isUserDeletedFromFirebase);

  return <div className=" absolute -z-50"></div>;
}

export default DeleteUserFromFirebaseClient;
