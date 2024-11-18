import Image from "next/image";
import Link from "next/link";
import React from "react";

function WhatsupGifLogo() {
    const isSmallScreen = window.innerWidth < 768;

    return (
        <Link
            href={"/"}
            className={`justify-self-center relative aspect-square rounded-full overflow-hidden
                ${isSmallScreen ? "w-16" : "w-28"}    
            `}
        >
            <Image src={"/whatsapp.gif"} fill alt="logo" priority />
        </Link>
    );
}

export default WhatsupGifLogo;
