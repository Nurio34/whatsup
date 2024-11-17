import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { fireAuth } from "@/utils/firebaseConfig";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";

function Google() {
    const dispatch = useAppDispatch();

    const router = useRouter();

    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        const { user: fireUser } = await signInWithPopup(fireAuth, provider);
        const { displayName: username, email, photoURL: avatar } = fireUser;

        try {
            const response = await axiosInstance.post("/auth//google-login", {
                username,
                email,
                avatar,
            });
            console.log(response);

            if (response.data.status === "success") {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
                router.push("/");
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
            onClick={handleGoogleLogin}
        >
            <FcGoogle />
            Login with Google
        </button>
    );
}

export default Google;
