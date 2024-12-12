export type MediaType = {
  asset_id: string;
  public_id: string;
  width: number;
  height: number;
  resource_type: string;
  url: string;
  secure_url: string;
  format: string;
  duration: string;
};

export type MessageType = {
  _id: string;
  senderId: string;
  type: string;
  message: string;
  status: string;
  createdAt: Date;
  medias: MediaType[];
};

export type ChatType = {
  connectionId: string;
  messages: MessageType[];
};
