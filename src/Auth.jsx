import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useAuth } from "./AuthContext"; // Import useAuth from AuthContext
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/system";

// Styled button with gradient background
const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
  borderRadius: "50px",
  color: "white",
  fontWeight: "bold",
  padding: "12px 24px",
  fontSize: "1rem",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    background: "linear-gradient(45deg, #FF4B2B, #FF416C)",
    transform: "scale(1.05)",
  },
});

const Auth = () => {
  const [name, setName] = useState("");
  const { setUser } = useAuth(); // Access setUser from AuthContext
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim().toLowerCase() === "taylor") {
      setUser({ name: "Taylor", occupation: "Busy Professional" });
      navigate("/"); // Redirect to home
    } else {
      toast.error("Invalid name. Please enter 'taylor' to login as Taylor.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f2f5, #d9dfe5)",
        p: 2,
      }}
    >
      <Container maxWidth="xs" sx={{ textAlign: "center", bgcolor: "white", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
        />
        
        {/* Title and subtitle */}
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "#777" }}>
          Access your personalized recipes with ease.
        </Typography>
        
        {/* Input field */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              "&.Mui-focused fieldset": {
                borderColor: "#FF416C",
              },
            },
          }}
        />

        {/* Login button */}
        <StyledButton onClick={handleLogin} fullWidth>
          Login as Taylor
        </StyledButton>
      </Container>
    </Box>
  );
};

export default Auth;
