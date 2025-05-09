export interface ContactType {
  avatar: {
    url: string;
  };
  _id: string;
  username: string;
  email: string;
  about: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    public_id: string;
    asset_id: string;
  };
  newUser: boolean;
  isVerified: string;
  createdAt: Date;
  otpExpires?: Date;
  resetPasswordOtpExpires?: Date;
  about: string;
  status: StatusType;
}

export type ChatsUserType = {
  avatar: {
    url: string;
  };
  username: string;
  _id: string;
  about: string;
};

export type StatusType = "online" | "offline";
