import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserType } from "@/type/user";

type UserSliceType = {
    isLoading: boolean;
    user: UserType | null;
    otpExpires: Date | null;
    isUserDeletedFromFirebase: boolean;
};

const initialState: UserSliceType = {
    isLoading: false,
    user: null,
    otpExpires: null,
    isUserDeletedFromFirebase: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action: PayloadAction<UserType | null>) => {
            state.user = action.payload;
        },
        setOtpExpires: (state, action: PayloadAction<Date | null>) => {
            state.otpExpires = action.payload;
        },
        deleteUserFromFirebaseAction: (state) => {
            state.isUserDeletedFromFirebase = true;
        },
        logoutUser: () => initialState,
    },
});

export const {
    setIsLoading,
    setUser,
    setOtpExpires,
    deleteUserFromFirebaseAction,
    logoutUser,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
