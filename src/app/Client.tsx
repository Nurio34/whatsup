"use client";

import { useAppSelector } from "@/store/hooks";
import HomeUnauth from "./components/HomeUnauth";
import HomeAuth from "./components/HomeAuth";

function HomePageClient() {
    const { user } = useAppSelector((s) => s.user);

    //     ! *** LOGOUT ***
    // const dispatch = useAppDispatch();
    // dispatch(logoutUser());
    // persistor.purge();
    // ! ***

    return !user ? <HomeUnauth /> : <HomeAuth user={user} />;
}

export default HomePageClient;
