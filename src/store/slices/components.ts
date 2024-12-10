import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { logoutUser } from "./user";

export type CurrentMenuType = {
  name: string;
  index: number;
};

export type AnimatedMediaSizeType = {
  width: number;
  height: number;
};

export type AnimatedMediaPlaceOffsetType = { top: number; left: number };

type ComponentsType = {
  screenHeight: number;
  headerHeight: number;
  isSideMenuOpen: boolean;
  currentMenu: CurrentMenuType;
  isUserSearchContainerVisible: boolean;
  renderedComponent: string;
  chatsMenuHeaderHeight: number;
  chatsSearchChatHeight: number;
  isGaleryOpen: boolean;
  animatedMediaSize: AnimatedMediaSizeType;
  animatedMediaPlaceOffset: AnimatedMediaPlaceOffsetType;
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
  isGaleryOpen: false,
  animatedMediaSize: { width: 0, height: 0 },
  animatedMediaPlaceOffset: { top: 0, left: 0 },
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
    setIsGaleryOpen: (state, action: PayloadAction<boolean>) => {
      state.isGaleryOpen = action.payload;
    },
    setAnimatedMediaSize: (
      state,
      action: PayloadAction<AnimatedMediaSizeType>
    ) => {
      state.animatedMediaSize = action.payload;
    },
    setAnimatedMediaPlaceOffset: (
      state,
      action: PayloadAction<AnimatedMediaPlaceOffsetType>
    ) => {
      state.animatedMediaPlaceOffset = action.payload;
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
  setIsGaleryOpen,
  setAnimatedMediaSize,
  setAnimatedMediaPlaceOffset,
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
export const selectIsGaleryOpen = (state: RootState) =>
  state.components.isGaleryOpen;
export const selectAnimatedMediaSize = (state: RootState) =>
  state.components.animatedMediaSize;
export const selectAnimatedMediaPlaceOffset = (state: RootState) =>
  state.components.animatedMediaPlaceOffset;
