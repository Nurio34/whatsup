export type MessageType = {
  senderId: string;
  type: string;
  message: string;
  status: string;
};

export type ChatType = {
  connectionId: string;
  messages: MessageType[];
};
