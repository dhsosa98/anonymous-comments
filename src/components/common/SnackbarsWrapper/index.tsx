import { Alert, Snackbar } from "@mui/material";


type SnackbarsWrapperProps = {
    errorMessage: String;
    handleError: (error: unknown) => void;
    success: boolean;
    setSuccess: (value: boolean) => void;
  };
  
  export default function SnackbarsWrapper({ errorMessage, handleError, success, setSuccess}: SnackbarsWrapperProps) {
    return (
      <>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={2000}
          onClose={handleError}
        >
          <Alert onClose={handleError} sx={{ width: "100%" }} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            sx={{ width: "100%" }}
            severity="success"
          >
            {"Comment created Successfully"}
          </Alert>
        </Snackbar>
      </>
    );
  }
  