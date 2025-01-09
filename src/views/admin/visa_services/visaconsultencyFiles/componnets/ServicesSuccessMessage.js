import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";
function SuccessMessage({ visadetails, selectedClientData }) {
  console.log(selectedClientData);
  const router = useRouter();
  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Grid item>
        <Box
          sx={{
            backgroundColor: "#E8F5E9", // Light green background
            padding: "50px",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 50,
              color: "green",
              marginBottom: "16px",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Congratulations!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "8px",
            }}
          >
            Your Service Request is Successfully Placed
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              fontSize: "1rem",
            }}
          >
            The Tarafirst Team has started working on your service.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              fontSize: "1rem",
              marginBottom: "20px",
            }}
          >
            We will keep you posted shortly.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontSize: "16px",
              }}
              onClick={() => {
                router.push(
                  `/tara/visaconsultencydashboard/status?id=${selectedClientData?.user}`
                );
              }}
            >
              Check Your Status
            </Button>
            <Button
              variant="contained"
              // color="secondary"
              sx={{
                padding: "10px 20px",
                textTransform: "none",
                fontSize: "16px",
              }}
              onClick={() => {
                // Add navigation logic for "Go to Dashboard"
                console.log("Go to Dashboard clicked");
                router.push("/tara");
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SuccessMessage;
