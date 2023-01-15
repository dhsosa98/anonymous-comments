import { Container, Box } from "@mui/material";

import useComments from "@/hooks/useComments";
import CommentsHeaderWrapper from "@/components/Comments/CommentsHeaderWrapper";
import SnackbarsWrapper from "@/components/common/SnackbarsWrapper";
import AddCommentCard from "@/components/Comments/AddCommentCard";
import CommentsWrapper from "@/components/Comments/CommentsWrapper";

export default function Home() {
  const {
    comments,
    error: errorMessage,
    handleError,
    loading,
    handleDislike,
    handleLike,
    handleSubmit,
    success,
    setSuccess,
    formRef,
  } = useComments();

  return (
    <>
      <Container
        sx={{
          padding: "1em",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "2em",
          }}
        >
          <CommentsHeaderWrapper />
          <AddCommentCard handleSubmit={handleSubmit} formRef={formRef} />
          <CommentsWrapper
            comments={comments}
            loading={loading}
            handleDislike={handleDislike}
            handleLike={handleLike}
          />
          <SnackbarsWrapper
            errorMessage={errorMessage}
            handleError={handleError}
            success={success}
            setSuccess={setSuccess}
          />
        </Box>
      </Container>
    </>
  );
}
