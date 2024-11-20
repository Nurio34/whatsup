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
        const form = new FormData();
        form.append("id", id);
        form.append("name", name);
        form.append("about", about);
        form.append("avatarFile", avatarFile!);

        try {
            const response = await axiosInstance.post(
                "/auth/create-profile",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

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
