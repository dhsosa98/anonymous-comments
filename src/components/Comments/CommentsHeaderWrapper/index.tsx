import { Box } from "@mui/material";

export default function CommentsHeaderWrapper() {
    return (
      <Box
        sx={{
          typography: "h3",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Welcome to Annonymus Comments
      </Box>
    );
  }