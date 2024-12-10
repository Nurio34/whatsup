import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ContactType, StatusType, UserType } from "@/type/user";

type UserSliceType = {
  isLoading: boolean;
  user: UserType | null;
  otpExpires: Date | null;
  isUserDeletedFromFirebase: boolean;
  isMobile: boolean;
  token: string | null;
  connectWith: string[];
  contacts: ContactType[];
};

const initialState: UserSliceType = {
  isLoading: false,
  user: null,
  otpExpires: null,
  isUserDeletedFromFirebase: false,
  isMobile: false,
  token: null,
  connectWith: [""],
  contacts: [] as ContactType[],
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
    setConnectWith: (state, action: PayloadAction<string[]>) => {
      if (state.connectWith.length === 1) {
        state.connectWith = [...state.connectWith, ...action.payload];
      }
    },
    addToConnectWith: (state, action: PayloadAction<string>) => {
      state.connectWith.push(action.payload);
    },

    addToContacts: (state, action: PayloadAction<ContactType>) => {
      state.contacts.push(action.payload);
    },
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.user!.status = action.payload;
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
  setConnectWith,
  addToConnectWith,
  addToContacts,
  setStatus,
  logoutUser,
} = userSlice.actions;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUser = (state: RootState) => state.user.user;
export const selectOtpExpires = (state: RootState) => state.user.otpExpires;
export const selectIsUserDeletedFromFirebase = (state: RootState) =>
  state.user.isUserDeletedFromFirebase;
export const selectIsMoile = (state: RootState) => state.user.isMobile;
export const selectToken = (state: RootState) => state.user.token;
export const selectConnectWith = (state: RootState) => state.user.connectWith;
export const selectContacts = (state: RootState) => state.user.contacts;
export default userSlice.reducer;
