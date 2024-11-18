import { Dispatch, SetStateAction } from "react";

function FormControls({
    name,
    setName,
    about,
    setAbout,
}: {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    about: string;
    setAbout: Dispatch<SetStateAction<string>>;
}) {
    return (
        <div className=" self-center space-y-[1vh] w-full md:max-w-64  ">
            <div className="grid gap-y-[0vh] justify-items-start">
                <label htmlFor="name" className=" font-semibold">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className=" border-2 rounded-md py-1 px-[1vw] justify-self-stretch w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="grid gap-y-[0vh] justify-items-start">
                <label htmlFor="about" className=" font-semibold">
                    About
                </label>
                <textarea
                    name="about"
                    id="about"
                    rows={3}
                    className=" border-2 rounded-md py-1 px-[1vw] w-full"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
}

export default FormControls;
