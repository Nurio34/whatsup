import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { logoutUser } from "./user";
import { ChatType, MediaType, MessageType } from "@/type/message";
import { ChatsUserType } from "@/type/user";

type ChatSliceType = {
  selectedConnection: ChatsUserType | null;
  chat: ChatType[];
  currentMedias: MediaType[] | null;
  currentMessage: string;
};

const initialState: ChatSliceType = {
  selectedConnection: null,
  chat: [] as ChatType[],
  currentMedias: null,
  currentMessage: "",
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
            if (
              message.status === "sent" &&
              action.payload.status === "delivered"
            ) {
              message.status = action.payload.status;
            } else if (action.payload.status === "seen") {
              message.status = action.payload.status;
            }
          }
        });
      });
    },
    saveLostMessages: (
      state,
      action: PayloadAction<{ connectionId: string; messages: MessageType[] }>
    ) => {
      const { connectionId, messages } = action.payload;

      const currentChat = state.chat.find(
        (chat) => chat.connectionId === connectionId
      );

      if (currentChat) {
        messages.forEach((message) => {
          // Add only if no message with the same _id exists
          if (!currentChat.messages.some((msg) => msg._id === message._id)) {
            currentChat.messages.push(message);
          }
        });
      }
    },
    setCurrenMedias: (state, action: PayloadAction<MediaType[] | null>) => {
      state.currentMedias = action.payload;
    },
    setCurrenMessage: (state, action: PayloadAction<string>) => {
      state.currentMessage = action.payload;
    },
    deleteMessage: (
      state,
      action: PayloadAction<{ connectionId: string; messageId: string }>
    ) => {
      const { connectionId, messageId } = action.payload;
      const currentChat = state.chat.find(
        (item) => item.connectionId === connectionId
      );

      if (currentChat) {
        currentChat.messages = currentChat.messages.filter(
          (message) => message._id !== messageId
        );
      }
    },
    deleteMessages: (
      state,
      action: PayloadAction<{ connectionId: string; messagesIds: string[] }>
    ) => {
      const { connectionId, messagesIds } = action.payload;

      // Find the current chat by connectionId
      const currentChat = state.chat.find(
        (item) => item.connectionId === connectionId
      );

      if (currentChat) {
        // Use a Set for O(1) lookup performance
        const messagesToDelete = new Set(messagesIds);

        // Filter out messages whose _id is in the messagesIds array
        currentChat.messages = currentChat.messages.filter(
          (message) => !messagesToDelete.has(message._id)
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

export const {
  setSelectedConnection,
  saveSentMessage,
  getChat,
  messageSeen,
  saveLostMessages,
  setCurrenMedias,
  setCurrenMessage,
  deleteMessage,
  deleteMessages,
} = chatSlice.actions;
export const selectSelectedConnection = (state: RootState) =>
  state.chat.selectedConnection;
export const selectChat = (state: RootState) => state.chat.chat;
export const selectCurrentMedias = (state: RootState) =>
  state.chat.currentMedias;
export const selectCurrentMessage = (state: RootState) =>
  state.chat.currentMessage;

export default chatSlice.reducer;
