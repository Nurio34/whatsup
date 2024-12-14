import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ErrorsType, FormType, initialFormDataProd } from "@/type/form";
import { logoutUser } from "./user";

export type ThirdPartyLoginTypeType = "google" | "github" | "twitter" | null;

type AuthType = {
  form: FormType;
  isLoading: boolean;
  errors: ErrorsType;
  isSubmitted: boolean;
  thirdPartyLoginType: ThirdPartyLoginTypeType;
};

const initialState: AuthType = {
  form: initialFormDataProd,
  isLoading: false,
  errors: null,
  isSubmitted: false,
  thirdPartyLoginType: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    writeForm: (state, action: PayloadAction<FormType>) => {
      state.form = action.payload;
    },
    writeIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    writeErrors: (state, action: PayloadAction<ErrorsType>) => {
      state.errors = action.payload;
    },
    writeIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setThirdPartyLoginType: (
      state,
      action: PayloadAction<ThirdPartyLoginTypeType>
    ) => {
      state.thirdPartyLoginType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

export const {
  writeForm,
  writeIsLoading,
  writeErrors,
  writeIsSubmitted,
  setThirdPartyLoginType,
} = authSlice.actions;
export const selectForm = (state: RootState) => state.auth.form;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectErrors = (state: RootState) => state.auth.errors;
export const selectIsSubmitted = (state: RootState) => state.auth.isSubmitted;
export const selectThirdPartyLoginType = (state: RootState) =>
  state.auth.thirdPartyLoginType;
export default authSlice.reducer;
