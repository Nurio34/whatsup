import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

function Logo() {
    const { user } = useAppSelector((s) => s.user);

    return (
        <div className=" flex gap-2 items-center">
            <figure className=" relative w-10 aspect-square">
                <Image
                    src={
                        process.env.NEXT_PUBLIC_LOGO || "/logo-placeholder.svg"
                    }
                    fill
                    alt="logo"
                    priority
                />
            </figure>
            <p
                className={`text-2xl font-semibold capitalize font-serif ${
                    !user && "text-white"
                }`}
                style={{ fontVariant: "small-caps" }}
            >
                {process.env.NEXT_PUBLIC_LOGO_NAME || "my app"}
            </p>
        </div>
    );
}

export default Logo;
