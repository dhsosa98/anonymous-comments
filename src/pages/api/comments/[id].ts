import dbConnect from "@/lib/dbConnect";
import { validatorFactory } from "@/lib/middlewares/validatorFactory";
import { LikeOrDislikeCommentValidationSchema } from "@/lib/validation-schemas/comments";
import { Comment, IComment } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

type NextApiRequestWithSession = NextApiRequest & { headers: {
    "x-session": string
} };

export default async function handler(req: NextApiRequestWithSession, res: NextApiResponse) {
    try {
        const session = req.headers["x-session"];
        switch (req.method) {
            case "PUT":
                validatorFactory({...LikeOrDislikeCommentValidationSchema})
                await dbConnect();
                let comment = await Comment.findById<IComment>(req.query.id);
                if (!comment) {
                    return res.status(404).json({ error: "Comment not found" });
                }
                if (req.body.isLiked){
                    if (comment.usersLiked.includes(session)) {
                        const index = comment.usersLiked.indexOf(session);
                        comment.usersLiked.splice(index, 1);
                    }
                    else {
                        if (comment.usersDisliked.includes(session)) {
                            const index = comment.usersDisliked.indexOf(session);
                            comment.usersDisliked.splice(index, 1);
                        }
                        comment.usersLiked.push(session);
                    }
                }
                if (req.body.isDisliked){
                    if (comment.usersDisliked.includes(session)) {
                        const index = comment.usersDisliked.indexOf(session);
                        comment.usersDisliked.splice(index, 1);
                    }
                    else {
                        if (comment.usersLiked.includes(session)) {
                            const index = comment.usersLiked.indexOf(session);
                            comment.usersLiked.splice(index, 1);
                        }
                        comment.usersDisliked.push(session);
                    }
                }
                comment = await Comment.findOneAndUpdate<IComment>({_id: req.query.id}, {...comment})
                res.setHeader("x-session", session)
                return res.json({ comment });
            default:
                res.setHeader("Allow", ["PUT"]);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
} 