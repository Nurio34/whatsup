import { Blob } from "buffer";
import Image from "next/image";
import {
    Dispatch,
    MouseEvent,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";

function WhatsupAvatarGalery({
    setAvatar,
    setIsWhatsupAvatarGaleryVisible,
    setIsCameraButtonVisible,
    setAvatarFile,
}: {
    setAvatar: Dispatch<SetStateAction<string>>;
    setIsWhatsupAvatarGaleryVisible: Dispatch<SetStateAction<boolean>>;
    setIsCameraButtonVisible: Dispatch<SetStateAction<boolean>>;
    setAvatarFile: Dispatch<SetStateAction<File | null>>;
}) {
    const AvatarRef = useRef<HTMLButtonElement | null>(null);
    const [indicatorSize, setIndicatorSize] = useState({ width: 0, height: 0 });
    const [indicatorPosition, setIndicatorPosition] = useState({ x: 0, y: 0 });
    const [selectedAvatar, setSelectedAvatar] = useState("/avatar/1.png");
    console.log({ selectedAvatar });

    useEffect(() => {
        if (AvatarRef.current) {
            const width = AvatarRef.current.getBoundingClientRect().width;
            const height = AvatarRef.current.getBoundingClientRect().height;
            setIndicatorSize({ width, height });
        }
    }, []);

    const getPositionOfAvatar = (
        e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    ) => {
        setIndicatorPosition({
            x: e.currentTarget.offsetLeft,
            y: e.currentTarget.offsetTop,
        });
    };

    const convertImageToFile = async (
        e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>,
    ) => {
        const imgElement = e.target as HTMLImageElement;

        if (imgElement) {
            const imageUrl = imgElement.src;
            setSelectedAvatar(imageUrl);

            const blob = await fetch(imageUrl).then((res) => res.blob());
            const file = new File([blob], "image.png", { type: blob.type });
            setAvatarFile(file);
        } else {
            console.log("No image found");
        }
    };

    return (
        <div
            className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,255,0.4)] z-50 py-[5vh] md:py-[10vh] px-[5vw] lg:px-[30vw]
        "
        >
            <div
                className=" w-full  px-[2vw] py-[2vh]  bg-white rounded-lg border-2  border-[purple] shadow-lg shadow-[purple] overflow-hidden
                    grid grid-rows-[1fr,auto] 
                "
            >
                <ul
                    className=" self-stretch relative isolate 
                        grid grid-cols-[repeat(3,1fr)] gap-x-[2vw] gap-y-[2vh]
                    "
                >
                    <>
                        {Array(10)
                            .fill("#")
                            .map((_, index) => {
                                if (index < 9) {
                                    return (
                                        <li
                                            key={index}
                                            className=""
                                            onClick={getPositionOfAvatar}
                                        >
                                            <button
                                                type="button"
                                                className=" relative  w-full  aspect-square"
                                                ref={AvatarRef}
                                            >
                                                <Image
                                                    src={`/avatar/${
                                                        index + 1
                                                    }.png`}
                                                    fill
                                                    alt={`whatsup avatar ${
                                                        index + 1
                                                    }`}
                                                    onClick={convertImageToFile}
                                                />
                                            </button>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className=" bg-pink-500 absolute rounded-full -z-10 transition-all"
                                            style={{
                                                width: indicatorSize.width,
                                                height: indicatorSize.height,
                                                top: indicatorPosition.y,
                                                left: indicatorPosition.x,
                                                filter: "blur(16px) drop-shadow(0 0 5px pink) drop-shadow(0 0 10px pink) drop-shadow(0 0 15px pink)",
                                            }}
                                        ></div>
                                    );
                                }
                            })}
                    </>
                </ul>
                <div className=" pt-[2vh] flex items-center gap-[2vw]">
                    <button
                        type="button"
                        className="c-btn bg-[red] hover:bg-red-500 grow"
                        onClick={() => {
                            setIsCameraButtonVisible(false);
                            setIsWhatsupAvatarGaleryVisible(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="c-btn bg-[green] hover:bg-green-500 grow"
                        onClick={() => {
                            setIsWhatsupAvatarGaleryVisible(false);
                            setAvatar(selectedAvatar);
                            setIsCameraButtonVisible(false);
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WhatsupAvatarGalery;
