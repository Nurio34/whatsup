import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function WhatsupGifLogo() {
    const { isMobile } = useAppSelector((s) => s.user);

    return (
        <Link
            href={"/"}
            className={`justify-self-center relative aspect-square rounded-full overflow-hidden
                ${isMobile ? "w-16" : "w-28"}    
            `}
        >
            <Image
                src={"/whatsapp.gif"}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt="logo"
                priority
            />
        </Link>
    );
}

export default WhatsupGifLogo;
