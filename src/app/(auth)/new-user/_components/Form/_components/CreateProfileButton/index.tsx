import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsLoading, setUser } from "@/store/slices/user";
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
    const { isLoading } = useAppSelector((s) => s.user);
    const dispatch = useAppDispatch();

    const createProfile = async () => {
        const form = new FormData();
        form.append("id", id);
        form.append("name", name);
        form.append("about", about);
        form.append("avatarFile", avatarFile!);

        dispatch(setIsLoading(true));

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
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    return (
        <button
            type="button"
            className={`col-span-full flex justify-center items-center gap-x-[2vw]
                ${isLoading ? "c-d-btn" : "c-btn bg-green-500 hover:bg-[green]"}
            `}
            onClick={createProfile}
        >
            {isLoading ? "Creating" : "Create Profile"}
            {isLoading && (
                <span className="loading loading-spinner loading-md"></span>
            )}
        </button>
    );
}

export default CreateProfileButton;
