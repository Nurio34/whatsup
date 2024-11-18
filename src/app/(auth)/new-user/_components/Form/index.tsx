import { UserType } from "@/type/user";
import { useEffect, useState } from "react";
import AvatarContainer from "./_components/AvatarContainer";
import FormControls from "./_components/FormControls";

function Form({ user }: { user: UserType }) {
    const [name, setName] = useState(user.username);
    const [about, setAbout] = useState("");
    const [avatar, setAvatar] = useState(
        user.avatar.trim() === ""
            ? process.env.NEXT_PUBLIC_AVATAR_IMAGE!
            : user.avatar,
    );
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    console.log({ avatarFile });

    useEffect(() => {
        if (Boolean(avatar)) {
            const convertImageToFile = async () => {
                const blob = await fetch(avatar).then((res) => res.blob());
                const file = new File([blob], "image.png", { type: blob.type });
                setAvatarFile(file);
            };

            convertImageToFile();
        }
    }, [avatar]);

    return (
        <form
            className="grid grid-cols-2 gap-x-[1vw] border-2 shadow-lg rounded-lg px-[2vw] py-[2vh] mx-[5vw]"
            id="Form"
        >
            <AvatarContainer
                avatar={avatar}
                setAvatar={setAvatar}
                setAvatarFile={setAvatarFile}
            />
            <FormControls
                name={name}
                setName={setName}
                about={about}
                setAbout={setAbout}
            />
        </form>
    );
}

export default Form;
