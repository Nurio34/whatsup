import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ChatsUserType } from "@/app/[id]/components/Menu/Chats";

type ChatSliceType = {
  selectedConnection: ChatsUserType | null;
};

const initialState: ChatSliceType = {
  selectedConnection: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConnection: (state, action: PayloadAction<ChatsUserType>) => {
      state.selectedConnection = action.payload;
    },
  },
});

export const { setSelectedConnection } = chatSlice.actions;
export const selectSelectedConnection = (state: RootState) =>
  state.chat.selectedConnection;
export default chatSlice.reducer;
