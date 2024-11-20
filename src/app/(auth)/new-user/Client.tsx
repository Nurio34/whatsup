"use client";

import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import WhatsupGifLogo from "../_components/WhatsupGifLogo";
import Form from "./_components/Form";
import useDeleteUserFromFirebase from "@/hooks/useDeleteUserFromFirebase";
import { useRouter } from "next/navigation";

function NewUserClientPage() {
    const { user, isUserDeletedFromFirebase, isMobile } = useAppSelector(
        (s) => s.user,
    );
    useDeleteUserFromFirebase(isUserDeletedFromFirebase);

    const router = useRouter();

    useEffect(() => {
        if (!user || !user.newUser) {
            router.push("/");
        }
    }, [user]);

    return (
        <>
            {user && user.newUser && (
                <main className=" grid gap-y-[2vh] place-content-center py-[10vh] text-center">
                    <WhatsupGifLogo />
                    <h1 className=" text-5xl">Whatsup</h1>
                    <h2 className=" text-2xl">Create Your Profile</h2>
                    <Form user={user} isMobile={isMobile} />
                </main>
            )}
        </>
    );
}

export default NewUserClientPage;
