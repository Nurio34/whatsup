"use client";

import { useAppSelector } from "@/store/hooks";
import HomeUnauth from "./components/HomeUnauth";
import HomeAuth from "./components/HomeAuth";
import useDeleteUserFromFirebase from "@/hooks/useDeleteUserFromFirebase";

function HomePageClient() {
    const { user, isUserDeletedFromFirebase } = useAppSelector((s) => s.user);
    useDeleteUserFromFirebase(isUserDeletedFromFirebase);

    return !user ? <HomeUnauth /> : <HomeAuth />;
}

export default HomePageClient;
