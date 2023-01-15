import { Button, Card, FormLabel, TextField } from "@mui/material";

type AddCommentCardProps = {
    handleSubmit: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    formRef: React.RefObject<HTMLDivElement>;
  };
  
export default function AddCommentCard({ handleSubmit, formRef }: AddCommentCardProps) {
    return (
      <Card
        component={"form"}
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1em",
          gap: "10px",
          minWidth: "280px",
        }}
      >
        <FormLabel htmlFor="Comment">Insert your comment:</FormLabel>
        <TextField id="Comment" name="Comment" />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Card>
    );
  }