import { AnimatePresence, motion } from "framer-motion";
import {
    ChangeEvent,
    Dispatch,
    MouseEvent,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import WhatsupAvatarGalery from "./WhatsupAvatarGalery";
import Camera from "./Camera";

function AvatarMenu({
    setIsAvatarMenuVisible,
    setAvatar,
    setIsCameraButtonVisible,
    setAvatarFile,
}: {
    setIsAvatarMenuVisible: Dispatch<SetStateAction<boolean>>;
    setAvatar: Dispatch<SetStateAction<string>>;
    setIsCameraButtonVisible: Dispatch<SetStateAction<boolean>>;
    setAvatarFile: Dispatch<SetStateAction<File | null>>;
}) {
    const [isWhatsupAvatarGaleryVisible, setIsWhatsupAvatarGaleryVisible] =
        useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    useEffect(() => {
        const closeAvatarMenu = (e: globalThis.MouseEvent) => {
            const FormElement = document.querySelector("#Form")!;

            if (
                e.target === FormElement ||
                FormElement.contains(e.target as Node)
            )
                return;

            setIsAvatarMenuVisible(false);
        };

        document.addEventListener("click", closeAvatarMenu);

        return () => {
            document.removeEventListener("click", closeAvatarMenu);
        };
    }, []);

    const avatarMenuItems = [
        { label: "Take Photo" },
        { label: "Whatsup Avatars" },
        { label: "Upload Photo" },
        { label: "Delete Avatar" },
    ];

    const takePhoto = () => {
        setIsCameraOpen(true);
    };

    const whatsupAvatars = () => {
        setIsWhatsupAvatarGaleryVisible(true);
    };

    const uploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const file = files && files.length > 0 ? files[0] : null;

        if (file instanceof Blob) {
            const avatarUrl = URL.createObjectURL(file);
            setAvatar(avatarUrl);
            setAvatarFile(file);
        }
    };

    const deleteAvatar = () => {
        setAvatar(process.env.NEXT_PUBLIC_AVATAR_IMAGE!);
    };

    const handleClick = (
        e:
            | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
            | ChangeEvent<HTMLInputElement>,
        label: string,
    ) => {
        if (label === "Take Photo") {
            takePhoto();
        }

        if (label === "Whatsup Avatars") {
            whatsupAvatars();
        }

        if (label === "Upload Photo") {
            uploadPhoto(e as ChangeEvent<HTMLInputElement>);
            setIsAvatarMenuVisible(false);
        }

        if (label === "Delete Avatar") {
            setIsAvatarMenuVisible(false);
            deleteAvatar();
        }
    };

    return (
        <>
            <motion.ul
                className="grid place-content-center gap-y-[1vh] border-2 overflow-x-hidden rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
            >
                {avatarMenuItems.map((item, index) => (
                    <motion.li
                        key={item.label}
                        initial={{ x: "-50%", opacity: 0 }}
                        animate={{ x: "0", opacity: 1 }}
                        transition={{
                            delay: index * 0.1,
                            type: "tween",
                        }}
                    >
                        {item.label === "Upload Photo" ? (
                            <div className=" transition-all hover:scale-105 hover:text-[purple] hover:font-semibold hover:underline hover:underline-offset-4">
                                <label
                                    htmlFor="avatar"
                                    className=" cursor-pointer"
                                >
                                    {item.label}
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    hidden
                                    onChange={(e) => {
                                        handleClick(e, item.label);
                                    }}
                                />
                            </div>
                        ) : (
                            <button
                                type="button"
                                className=" transition-all hover:scale-105 hover:text-[purple] hover:font-semibold hover:underline hover:underline-offset-4"
                                onClick={(e) => handleClick(e, item.label)}
                            >
                                {item.label}
                            </button>
                        )}
                    </motion.li>
                ))}
            </motion.ul>
            <AnimatePresence>
                {isWhatsupAvatarGaleryVisible && (
                    <WhatsupAvatarGalery
                        setAvatar={setAvatar}
                        setIsWhatsupAvatarGaleryVisible={
                            setIsWhatsupAvatarGaleryVisible
                        }
                        setIsCameraButtonVisible={setIsCameraButtonVisible}
                        setAvatarFile={setAvatarFile}
                        setIsAvatarMenuVisible={setIsAvatarMenuVisible}
                    />
                )}
                {isCameraOpen && (
                    <Camera
                        setAvatar={setAvatar}
                        setIsCameraOpen={setIsCameraOpen}
                        setIsAvatarMenuVisible={setIsAvatarMenuVisible}
                        setIsCameraButtonVisible={setIsCameraButtonVisible}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default AvatarMenu;
