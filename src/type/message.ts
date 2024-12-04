export type MessageType = {
  senderId: string;
  type: string;
  message: string;
  status: string;
  createdAt: Date;
};

export type ChatType = {
  connectionId: string;
  messages: MessageType[];
};

export type RealtimeMessageType = {
  senderId: string;
  reciverId: string;
  message: string;
  type: string;
  status: string;
  createdAt: Date;
};
