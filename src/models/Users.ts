import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    date: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: String,
    email: String,
    password: String,
    date: Date
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

