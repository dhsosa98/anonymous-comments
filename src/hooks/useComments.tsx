import { IComment } from "@/models/Comment";
import { createComment, getComments, likeOrDislikeComment } from "@/services/comments";
import { useEffect, useRef, useState } from "react";

const useComments = () => {
    const [comments, setComments] = useState<IComment[]>([]);

    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String>('');


    const formRef = useRef<HTMLDivElement>(null);

    const handleError = (error: unknown) => {
        setError(error as string);
    };

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await getComments();
            setComments(response.reverse());
        } catch (error: any) {
            handleError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: React.SyntheticEvent<HTMLDivElement>) => {
        try {
        event.preventDefault();
        const formData = new FormData(
          formRef.current as unknown as HTMLFormElement
        );
        const comment = formData.get("Comment");
        if (!comment) return;
        await createComment(comment as string);
        (formRef.current as unknown as HTMLFormElement).reset();
        fetchComments();
        setSuccess(true);
        } catch (error: any) {
          handleError(error.message);
        }
      };
    
      const handleLike = async (_id: string) => {
        try {
          await likeOrDislikeComment({ commentId: _id, isLiked: true });
          fetchComments();
        } catch (error: any) {
          handleError(error.message);
        }
      };
    
      const handleDislike = async (_id: string) => {
        try{
        await likeOrDislikeComment({ commentId: _id, isDisliked: true });
        fetchComments();
        } catch (error: unknown) {
          handleError(error);
        }
      };

    useEffect(() => {
        fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return { comments, loading, error, handleError, handleLike, handleDislike, handleSubmit, success, setSuccess, formRef };
}

export default useComments;

