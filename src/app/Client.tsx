"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import HomeUnauth from "./components/HomeUnauth";
import HomeAuth from "./components/HomeAuth";
import { logoutUser } from "@/store/slices/user";

function HomePageClient() {
    const { user } = useAppSelector((s) => s.user);

    //! *** LOGOUT ***
    // const dispatch = useAppDispatch();
    // dispatch(logoutUser());
    // persistor.purge();
    //! ***

    return !user ? <HomeUnauth /> : <HomeAuth />;
}

export default HomePageClient;
