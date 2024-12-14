import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { fireAuth } from "@/utils/firebaseConfig";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToken, setUser } from "@/store/slices/user";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import {
  selectThirdPartyLoginType,
  setThirdPartyLoginType,
} from "@/store/slices/auth";

function Github() {
  const thirdPartyLoginType = useAppSelector(selectThirdPartyLoginType);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const provider = new GithubAuthProvider();

  const handleGithubLogin = async () => {
    dispatch(setThirdPartyLoginType("github"));

    signInWithPopup(fireAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log({ token });

        const GoogleUser = result.user;
        const { displayName: username, email, photoURL: avatar } = GoogleUser;
        const loginType = "Github";

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
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log({ errorCode, errorMessage, email, credential });
        dispatch(setThirdPartyLoginType(null));
      });
  };

  return (
    <button
      type="button"
      className="c-btn gap-[1vw] flex items-center justify-center w-full text-black border-2 border-white"
      onClick={handleGithubLogin}
      disabled={Boolean(thirdPartyLoginType)}
    >
      {thirdPartyLoginType === "github" ? (
        <>
          <span className="loading loading-spinner loading-md"></span>
          <span>Please wait ..</span>
        </>
      ) : (
        <>
          <FaGithub />
          Login with Github
        </>
      )}
    </button>
  );
}

export default Github;
