export interface UserType {
    id: string;
    username: string;
    email: string;
    avatar: string;
    newUser: boolean;
    isVerified: string;
    createdAt: Date;
    otpExpires?: Date;
    resetPasswordOtpExpires?: Date;
}
