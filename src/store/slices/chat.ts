import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { logoutUser } from "./user";
import { ChatType, MessageType } from "@/type/message";
import { ChatsUserType } from "@/type/user";

type ChatSliceType = {
  selectedConnection: ChatsUserType | null;
  chat: ChatType[];
};

const initialState: ChatSliceType = {
  selectedConnection: null,
  chat: [] as ChatType[],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConnection: (state, action: PayloadAction<ChatsUserType>) => {
      state.selectedConnection = action.payload;
    },
    saveSentMessage: (
      state,
      action: PayloadAction<{
        connectionId: string;
        message: MessageType;
      }>
    ) => {
      const { connectionId, message } = action.payload;
      const currentChat = state.chat.find(
        (chat) => chat.connectionId === connectionId
      );
      currentChat?.messages.push(message);
    },
    getChat: (state, action: PayloadAction<ChatType>) => {
      state.chat.push(action.payload);
    },
    messageSeen: (state, action: PayloadAction<MessageType>) => {
      state.chat.forEach((item) => {
        item.messages.forEach((message) => {
          if (message._id === action.payload._id) {
            message.status = action.payload.status;
          }
        });
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

export const { setSelectedConnection, saveSentMessage, getChat, messageSeen } =
  chatSlice.actions;
export const selectSelectedConnection = (state: RootState) =>
  state.chat.selectedConnection;
export const selectChat = (state: RootState) => state.chat.chat;
export default chatSlice.reducer;
