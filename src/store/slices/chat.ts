import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ChatsUserType } from "@/app/[id]/components/Menu/Chats";
import { logoutUser } from "./user";
import { ChatType } from "@/type/message";

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
        message: {
          type: string;
          message: string;
          status: string;
          senderId: string;
          createdAt: Date;
        };
      }>
    ) => {
      const { connectionId, message } = action.payload;

      const existingChat = state.chat.find(
        (chat) => chat.connectionId === connectionId
      );

      if (existingChat) {
        existingChat.messages.push(message);
      } else {
        state.chat.push({
          connectionId,
          messages: [message],
        });
      }
    },
    getChat: (state, action: PayloadAction<ChatType>) => {
      state.chat.push(action.payload);
    },
    messagesSeen: (state, action: PayloadAction<string>) => {
      const chat = state.chat.find(
        (item) => item.connectionId === action.payload
      );
      if (chat) {
        let hasUnseenMessages = false;

        for (const msg of chat.messages) {
          if (msg.status !== "seen") {
            msg.status = "seen";
            hasUnseenMessages = true;
          }
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

export const { setSelectedConnection, saveSentMessage, getChat, messagesSeen } =
  chatSlice.actions;
export const selectSelectedConnection = (state: RootState) =>
  state.chat.selectedConnection;
export const selectChat = (state: RootState) => state.chat.chat;
export default chatSlice.reducer;
