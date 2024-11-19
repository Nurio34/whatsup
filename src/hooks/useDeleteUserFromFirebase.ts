import { useAppDispatch } from "@/store/hooks";
import { deleteUserFromFirebaseAction } from "@/store/slices/user";
import { app } from "@/utils/firebaseConfig";
import { deleteUser, getAuth } from "firebase/auth";
import { useEffect } from "react";

const useDeleteUserFromFirebase = (isUserDeletedFromFirebase: boolean) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (app) {
            const auth = getAuth();

            const deleteCurrentUser = async () => {
                const user = auth.currentUser;

                if (user) {
                    try {
                        await deleteUser(user);
                        dispatch(deleteUserFromFirebaseAction());
                    } catch (error) {
                        console.error("Error deleting user:", error);
                    }
                }
            };

            if (!isUserDeletedFromFirebase) {
                deleteCurrentUser();
            }
        }
    }, [isUserDeletedFromFirebase, dispatch, app]);
};

export default useDeleteUserFromFirebase;
