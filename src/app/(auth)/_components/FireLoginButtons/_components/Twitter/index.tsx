import {
    TwitterAuthProvider,
    deleteUser,
    getAuth,
    signInWithPopup,
} from "firebase/auth";
import { app, fireAuth } from "@/utils/firebaseConfig";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "@/axios";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";

function Twitter() {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const provider = new TwitterAuthProvider();

    const handleTwitterLogin = async () => {
        const { user: TwitterUser } = await signInWithPopup(fireAuth, provider);
        const { displayName: username, email, photoURL: avatar } = TwitterUser;
        const loginType = "Twitter";

        if (!email) {
            toast.error(
                "Your twitter email is not public. Please try another signin method !",
            );
            if (app) {
                const auth = getAuth();

                const deleteCurrentUser = async () => {
                    const user = auth.currentUser;

                    if (user) {
                        try {
                            await deleteUser(user);
                        } catch (error) {
                            console.error("Error deleting user:", error);
                        }
                    }
                };

                deleteCurrentUser();
            }
            return;
        }

        try {
            const response = await axiosInstance.post("/auth/firebase-login", {
                username,
                email,
                avatar,
                loginType,
            });

            if (response.data.status === "success") {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);

                if (response.data.user.newUser) {
                    router.push("/new-user");
                } else {
                    router.push("/");
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return (
        <button
            type="button"
            className="c-btn gap-[1vw] flex items-center justify-center w-full text-black border-2 border-white"
            onClick={handleTwitterLogin}
        >
            <FaXTwitter /> Login with X
        </button>
    );
}

export default Twitter;
