import dbConnect from "@/lib/dbConnect";
import { validatorFactory } from "@/lib/middlewares/validatorFactory";
import {CreateCommentValidationSchema}  from "@/lib/validation-schemas/comments";
import { Comment } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    switch (req.method) {
      case "GET":
        const comments = await Comment.find({});
        return res.json({ comments });
      case "POST":
        validatorFactory({...CreateCommentValidationSchema})
        const comment = await Comment.create({
          ...req.body,
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],
          date: new Date(),
        });
        return res.json({ comment });
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
