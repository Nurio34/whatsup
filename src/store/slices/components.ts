import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { logoutUser } from "./user";

export type CurrentMenuType = {
  name: string;
  index: number;
};

type ComponentsType = {
  screenHeight: number;
  headerHeight: number;
  isSideMenuOpen: boolean;
  currentMenu: CurrentMenuType;
  isUserSearchContainerVisible: boolean;
  renderedComponent: string;
  chatsMenuHeaderHeight: number;
  chatsSearchChatHeight: number;
};

const initialState: ComponentsType = {
  screenHeight: 0,
  headerHeight: 0,
  isSideMenuOpen: false,
  currentMenu: {
    name: "chats",
    index: 1,
  },
  isUserSearchContainerVisible: false,
  renderedComponent: "menu",
  chatsMenuHeaderHeight: 0,
  chatsSearchChatHeight: 0,
};

export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setScreenHeight: (state, action: PayloadAction<number>) => {
      state.screenHeight = action.payload;
    },
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
    setRenderedComponent: (state, action: PayloadAction<string>) => {
      state.renderedComponent = action.payload;
    },
    setChatsMenuHeaderHeight: (state, action: PayloadAction<number>) => {
      state.chatsMenuHeaderHeight = action.payload;
    },
    setChatsSearchChatHeight: (state, action: PayloadAction<number>) => {
      state.chatsSearchChatHeight = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState); // Directly return initial state
  },
});

export const {
  setScreenHeight,
  getHeight,
  setIsSideMenuOpen,
  setCurrentMenu,
  setIsUserSearchContainerVisible,
  setRenderedComponent,
  setChatsMenuHeaderHeight,
  setChatsSearchChatHeight,
} = componentsSlice.actions;
export default componentsSlice.reducer;

export const selectScreenHeight = (state: RootState) =>
  state.components.screenHeight;
export const selectHeaderHeight = (state: RootState) =>
  state.components.headerHeight;
export const selectIsSideMenuOpen = (state: RootState) =>
  state.components.isSideMenuOpen;
export const selectCurrentMenu = (state: RootState) =>
  state.components.currentMenu;
export const selectIsUserSearchContainerVisible = (state: RootState) =>
  state.components.isUserSearchContainerVisible;
export const selectRenderedComponent = (state: RootState) =>
  state.components.renderedComponent;
export const selectChatsMenuHeaderHeight = (state: RootState) =>
  state.components.chatsMenuHeaderHeight;
export const selectChatsSearchChatHeight = (state: RootState) =>
  state.components.chatsSearchChatHeight;
