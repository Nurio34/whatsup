import { UserType } from "@/type/user";
import FormControls from "../FormControls";
import AvatarContainer from "../AvatarContainer";
import { useEffect, useState } from "react";

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
