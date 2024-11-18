import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FcInfo } from "react-icons/fc";

function Camera({
    setAvatar,
    setIsCameraOpen,
    setIsAvatarMenuVisible,
    setIsCameraButtonVisible
}: {
    setAvatar: Dispatch<SetStateAction<string>>;
    setIsCameraOpen: Dispatch<SetStateAction<boolean>>;
    setIsAvatarMenuVisible: Dispatch<SetStateAction<boolean>>
    setIsCameraButtonVisible: Dispatch<SetStateAction<boolean>>
}) {
    const VideoElement = useRef<HTMLVideoElement | null>(null);
    const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
    const [capturedPhoto, setCapturedPhoto] = useState("");

    //! *** START CAMERA RECORDING && HANDLE VİDEOELEMENT'S SRCOBJECT ***
    useEffect(() => {
        let stream: MediaStream | null = null;

        const startRecording = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: { facingMode: "user" },
                });

                if (VideoElement.current) {
                    VideoElement.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error starting camera:", error);
            }
        };

        startRecording();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    //! ******************************

    //! *** CAPTURE PHOTO FROM VIDEO ***
    useEffect(() => {
        const capturePhoto = (e: KeyboardEvent) => {
            e.preventDefault();

            if (VideoElement.current) {
                const canvas = document.createElement("canvas");
                canvas.width = videoSize.width;
                canvas.height = videoSize.height;

                canvas
                    .getContext("2d")
                    ?.drawImage(
                        VideoElement.current,
                        0,
                        0,
                        videoSize.width,
                        videoSize.height,
                    );
                const photo = canvas.toDataURL("image/jpeg");
                setCapturedPhoto(photo);
            }
        };

        if (VideoElement.current) {
            toast("Press any 'Key' on keyboard to take a photo", {
                icon: <FcInfo size={24} />,
                style: { minWidth: "max-content" },
            });

            //! *** GET SIZE OF VIDEO ELEMENT ***
            const width = VideoElement.current.getBoundingClientRect().width;
            const height = VideoElement.current.getBoundingClientRect().height;
            setVideoSize({ width, height });
            //! ********************************

            //! *** ADD EVENT LISTENER TO PAGE ***
            document.addEventListener("keydown", capturePhoto);

            return () => {
                document.removeEventListener("keydown", capturePhoto);
            };
            //! **********************************
        }
    }, [VideoElement.current]);
    //! ***********************************************

    //! CLOSE CAMERA WHEN CLICK OUTSIDE OF BOZ ***
    useEffect(() => {
        const closeCamera = (e: globalThis.MouseEvent) => {
            const CameraElement = document.querySelector("#Camera");
            if (
                e.target === CameraElement ||
                CameraElement?.contains(e.target as Node)
            ) {
                return;
            } else {
                setIsCameraOpen(false);
            }
        };

        document.addEventListener("click", closeCamera);

        return () => {
            document.removeEventListener("click", closeCamera);
        };
    }, []);
    //! *****************************************

    return (
        <div
            className=" fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,255,0.4)] z-50 px-[2vw] md:px-0
                flex justify-center items-center
            "
        >
            <div
                id="Camera"
                className=" relative w-full md:w-1/2 aspect-square  px-[2vw] py-[2vh]  bg-white rounded-lg border-2  border-[purple] shadow-lg shadow-[purple] overflow-hidden
                 grid grid-rows-[1fr,auto]
             "
            >
                <div
                    className={`flex flex-col gap-y-[1vh] absolute top-0 left-0 w-full h-full py-[2vh] px-[2vw] z-10 ${
                        capturedPhoto ? "visible" : "hidden"
                    }`}
                >
                    {capturedPhoto && (
                        <figure className="relative w-full h-full rounded-md overflow-hidden">
                            <Image
                                src={capturedPhoto}
                                fill
                                alt="captured photo"
                            />
                        </figure>
                    )}
                    <div className=" flex items-center justify-center gap-x-[2vw]">
                        <button
                            type="button"
                            className="c-btn bg-[red] hover:bg-red-500"
                            onClick={() => setCapturedPhoto("")}
                        >
                            Take Another
                        </button>
                        <button
                            type="button"
                            className="c-btn bg-[green] hover:bg-green-500"
                            onClick={() => {
                                setAvatar(capturedPhoto);
                                setIsCameraOpen(false);
                                setIsAvatarMenuVisible(false)
                                setIsCameraButtonVisible(false)
                            }}
                        >
                            Save This
                        </button>
                    </div>
                </div>
                <video
                    autoPlay
                    ref={VideoElement}
                    className="w-full h-full rounded-md"
                ></video>
            </div>
        </div>
    );
}

export default Camera;
