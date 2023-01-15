import useSession from "@/hooks/useSession";
import { IComment } from "@/models/Comment";
import { Favorite, ThumbDown } from "@mui/icons-material";
import { Box, Card, CircularProgress, Fab, Paper } from "@mui/material";



type CommentsWrapperProps = {
  comments: IComment[];
  loading: boolean;
  handleDislike: (id: string) => void;
  handleLike: (id: string) => void;
};

export default function CommentsWrapper({ comments, loading, handleDislike, handleLike}: CommentsWrapperProps) {
  const { session } = useSession(comments);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <CircularProgress />}

      {comments?.map((comment: IComment) => {
        const day = new Date(comment.date).toLocaleDateString();
        const time = new Date(comment.date).toLocaleTimeString();
        const isLikedByUser = comment.usersLiked.includes(session);
        const isDislikedByUser = comment.usersDisliked.includes(session);
        return (
          <Card
            key={comment._id}
            sx={{
              padding: 4,
              gap: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  typography: "subtitle1",
                  fontWeight: "regular",
                }}
              >
                {"Date: "}
                <Box
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {day}
                </Box>
              </Box>
              <Box
                sx={{
                  typography: "subtitle1",
                  fontWeight: "regular",
                }}
              >
                {"Time: "}
                <Box
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {time}
                </Box>
              </Box>
            </Box>
            <Paper
              component={"textarea"}
              elevation={3}
              sx={{
                typography: "h5",
                padding: 2,
                minHeight: 180,
                maxWidth: 300,
                resize: "none",
                outline: "none",
              }}
              readOnly
            >
              {comment.comment}
            </Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Fab
                aria-label="like"
                onClick={() => handleLike(comment._id as string)}
                sx={{
                  display: "inline-flex",
                  gap: 0.5,
                }}
              >
                {isLikedByUser ? <Favorite /> : <Favorite color="disabled" />}
                <Box>{comment.likes}</Box>
              </Fab>
              <Fab
                aria-label="dislike"
                onClick={() => handleDislike(comment._id as string)}
                sx={{
                  display: "inline-flex",
                  gap: 0.5,
                }}
              >
                {isDislikedByUser ? (
                  <ThumbDown />
                ) : (
                  <ThumbDown color="disabled" />
                )}
                <Box>{comment.dislikes}</Box>
              </Fab>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}