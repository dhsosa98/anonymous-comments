import { Model, model, Query, Schema, Document, models } from "mongoose";
import User from "./Users";

type User = typeof User | String;

export interface IComment extends Document {
    comment: string;
    likes: number;
    dislikes: number;
    usersLiked: Array<User>;
    usersDisliked: Array<User>;
    date: Date;
}

const CommentSchema = new Schema<IComment, Model<Document>>({
    comment: String,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String],
    date: Date
});

CommentSchema.pre<Query<IComment, IComment>>("findOneAndUpdate", async function() {
    let data: any = this.getUpdate();
    data.likes = data.usersLiked.length;
    data.dislikes = data.usersDisliked.length;
});

export const Comment = models.Comment || model<IComment>('Comment', CommentSchema);


