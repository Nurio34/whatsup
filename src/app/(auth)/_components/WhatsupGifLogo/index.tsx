import Image from "next/image";
import Link from "next/link";
import React from "react";

function WhatsupGifLogo() {
    return (
        <Link
            href={"/"}
            className=" justify-self-center relative w-28 aspect-square rounded-full overflow-hidden"
        >
            <Image src={"/whatsapp.gif"} fill alt="logo" priority />
        </Link>
    );
}

export default WhatsupGifLogo;
