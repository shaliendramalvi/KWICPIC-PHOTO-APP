import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (!form.email || !form.password) return;

    //  LOGIN SUCCESS (FAKE)
    localStorage.setItem("isLoggedIn", "true");

    // dashboard
    navigate("/dashboard");

    // force re-render Header
    window.location.reload();
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f8fafc"
    >
      <Paper
        elevation={3}
        sx={{
          width: 360,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={1}>
          Login
        </Typography>

        <Typography fontSize={14} color="text.secondary" mb={3}>
          Welcome back! Please login to your account
        </Typography>

        <TextField
          fullWidth
          label="Email"
          size="small"
          margin="normal"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          size="small"
          margin="normal"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.1 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography
          fontSize={13}
          textAlign="center"
          color="primary"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </Typography>
      </Paper>
    </Box>
  );
}
