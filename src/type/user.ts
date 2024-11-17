export interface UserType {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    isVerified: string;
    createdAt: Date;
    otpExpires?: Date;
    resetPasswordOtpExpires?: Date;
}
