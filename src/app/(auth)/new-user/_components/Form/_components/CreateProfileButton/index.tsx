import axiosInstance from "@/axios";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

function CreateProfileButton({
    id,
    name,
    about,
    avatarFile,
}: {
    id: string;
    name: string;
    about: string;
    avatarFile: File | null;
}) {
    const dispatch = useAppDispatch();

    const createProfile = async () => {
        //todo *** WHEN YOU COMMIT THE PROFILE FORM, TOGGLE 'NEWUSER = FALSE' ALSO
        try {
            const response = await axiosInstance.post("/auth/create-profile", {
                id,
                name,
                about,
                avatarFile,
            });

            if (response.data.status === "success") {
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
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
            className="c-btn bg-green-500 hover:bg-[green] col-span-full"
            onClick={createProfile}
        >
            Create Profile
        </button>
    );
}

export default CreateProfileButton;
