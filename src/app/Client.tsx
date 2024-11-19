"use client";

import { useAppSelector } from "@/store/hooks";
import HomeUnauth from "./components/HomeUnauth";
import HomeAuth from "./components/HomeAuth";

function HomePageClient() {
    const { user, isUserDeletedFromFirebase } = useAppSelector((s) => s.user);

    return !user ? (
        <HomeUnauth />
    ) : (
        <HomeAuth
            user={user}
            isUserDeletedFromFirebase={isUserDeletedFromFirebase}
        />
    );
}

export default HomePageClient;
