import { IComment } from "@/models/Comment";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_BASE_URL || "http://localhost:3000";

axios.interceptors.request.use(
  (config: any) => {
    console.log(config)
      const session = localStorage.getItem("session");
      if (session) {
        config.headers["x-session"] = session;
      }
    return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
    (response) => {
        if (response.headers["x-session"]) {
            localStorage.setItem("session", response.headers["x-session"]);
          }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const getComments = async (): Promise<IComment[]> => {
  const response = await axios.get("/api/comments");
  return response.data.comments;
};

export const createComment = async (comment: string): Promise<IComment> => {
  const response = await axios.post("/api/comments", { comment });
  return response.data;
};

export const likeOrDislikeComment = async ({
  commentId,
  isLiked,
  isDisliked
}: {
    commentId: string;
    isLiked?: boolean;
    isDisliked?: boolean;
}): Promise<IComment> => {
  const response = await axios.put(`/api/comments/${commentId}`, {
    isLiked,
    isDisliked,
  });
  return response.data;
};
