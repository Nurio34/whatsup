import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { fireAuth } from "@/utils/firebaseConfig";
import axiosInstance from "@/axios";
import { setUser } from "@/store/slices/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function Github() {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const provider = new GithubAuthProvider();

    const handleGithubLogin = async () => {
        const { user: GithubUser } = await signInWithPopup(fireAuth, provider);

        const { displayName: username, email, photoURL: avatar } = GithubUser;
        const loginType = "Github";

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
            onClick={handleGithubLogin}
        >
            <FaGithub /> Login with Github
        </button>
    );
}

export default Github;
