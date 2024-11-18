"use client";

import axiosInstance from "@/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import WhatsupGifLogo from "../_components/WhatsupGifLogo";
import Form from "./_components/Form";

function NewUserClientPage() {
    const { user } = useAppSelector((s) => s.user);
    console.log(user);

    const dispatch = useAppDispatch();
    // const router = useRouter();

    // useEffect(() => {
    //     if (!user || !user.newUser) {
    //         router.push("/");
    //     }
    // }, []);

    useEffect(() => {
        const toggleNewUser = async () => {
            console.log("toggleNewUser");

            try {
                const response = await axiosInstance.post(
                    "/auth/toggle-new-user",
                    { id: user?.id },
                );
                if (response.data.status === "success") {
                    dispatch(setUser(response.data.user));
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error);
                }
            }
        };

        if (user?.newUser) {
            toggleNewUser();
        }
    }, [user?.newUser]);

    return (
        <>
            {user && (
                <main className=" grid gap-y-[2vh] place-content-center py-[10vh] text-center">
                    <WhatsupGifLogo />
                    <h1 className=" text-5xl">Whatsup</h1>
                    <h2 className=" text-2xl">Create Your Profile</h2>
                    <Form user={user} />
                </main>
            )}
        </>
    );
}

export default NewUserClientPage;
