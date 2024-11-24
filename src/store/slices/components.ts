import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { logoutUser } from "./user";

export type CurrentMenuType = {
  name: string;
  index: number;
};

type ComponentsType = {
  headerHeight: number;
  isSideMenuOpen: boolean;
  currentMenu: CurrentMenuType;
  isUserSearchContainerVisible: boolean;
};

const initialState: ComponentsType = {
  headerHeight: 0,
  isSideMenuOpen: false,
  currentMenu: {
    name: "chats",
    index: 1,
  },
  isUserSearchContainerVisible: false,
};

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    getHeight: (state, action: PayloadAction<number>) => {
      state.headerHeight = action.payload;
    },
    setIsSideMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideMenuOpen = action.payload;
    },
    setCurrentMenu: (
      state,
      action: PayloadAction<{ name: string; index: number }>
    ) => {
      state.currentMenu = action.payload;
    },
    setIsUserSearchContainerVisible: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isUserSearchContainerVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState); // Directly return initial state
  },
});

export const {
  getHeight,
  setIsSideMenuOpen,
  setCurrentMenu,
  setIsUserSearchContainerVisible,
} = componentsSlice.actions;
export default componentsSlice.reducer;

export const selectHeaderHeight = (state: RootState) =>
  state.components.headerHeight;
export const selectIsSideMenuOpen = (state: RootState) =>
  state.components.isSideMenuOpen;
export const selectCurrentMenu = (state: RootState) =>
  state.components.currentMenu;
export const selectIsUserSearchContainerVisible = (state: RootState) =>
  state.components.isUserSearchContainerVisible;
