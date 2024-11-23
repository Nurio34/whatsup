import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserType } from "@/type/user";

type UserSliceType = {
  isLoading: boolean;
  user: UserType | null;
  otpExpires: Date | null;
  isUserDeletedFromFirebase: boolean;
  isMobile: boolean;
  token: string | null;
};

const initialState: UserSliceType = {
  isLoading: false,
  user: null,
  otpExpires: null,
  isUserDeletedFromFirebase: false,
  isMobile: false,
  token: null,
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
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logoutUser: () => initialState,
  },
});

export const {
  setIsLoading,
  setUser,
  setOtpExpires,
  deleteUserFromFirebaseAction,
  setIsMobile,
  setToken,
  logoutUser,
} = userSlice.actions;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUser = (state: RootState) => state.user.user;
export const selectOtpExpires = (state: RootState) => state.user.otpExpires;
export const selectIsUserDeletedFromFirebase = (state: RootState) =>
  state.user.isUserDeletedFromFirebase;
export const selectIsMoile = (state: RootState) => state.user.isMobile;
export const selectToken = (state: RootState) => state.user.token;
export default userSlice.reducer;
