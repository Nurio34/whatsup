import { signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { fireAuth } from "@/utils/firebaseConfig";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToken, setUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import {
  selectThirdPartyLoginType,
  setThirdPartyLoginType,
} from "@/store/slices/auth";

function Twitter() {
  const thirdPartyLoginType = useAppSelector(selectThirdPartyLoginType);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const provider = new TwitterAuthProvider();

  const handleTwitterLogin = async () => {
    dispatch(setThirdPartyLoginType("twitter"));

    signInWithPopup(fireAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log({ token });

        const GoogleUser = result.user;
        const { displayName: username, email, photoURL: avatar } = GoogleUser;
        const loginType = "Twitter";

        const login = async () => {
          try {
            const response = await axiosInstance.post("/auth/firebase-login", {
              username,
              email,
              avatar,
              loginType,
            });

            if (response.data.status === "success") {
              dispatch(setUser(response.data.user));
              dispatch(setToken(response.data.token));

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
          } finally {
            dispatch(setThirdPartyLoginType(null));
          }
        };

        login();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
        console.log({ errorCode, errorMessage, email, credential });
        dispatch(setThirdPartyLoginType(null));
      });
  };

  return (
    <button
      type="button"
      className="c-btn gap-[1vw] flex items-center justify-center w-full text-black border-2 border-white"
      onClick={handleTwitterLogin}
      disabled={Boolean(thirdPartyLoginType)}
    >
      {thirdPartyLoginType === "twitter" ? (
        <>
          <span className="loading loading-spinner loading-md"></span>
          <span>Please wait ..</span>
        </>
      ) : (
        <>
          <FaXTwitter />
          Login with X
        </>
      )}
    </button>
  );
}

export default Twitter;
