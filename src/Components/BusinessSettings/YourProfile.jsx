import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function YourProfile() {
  // Initial Data (API se lenge ye bus mormal testingk liyue bnya h )
  const initialData = {
    firstName: "Shubham",
    lastName: "Dubey",
    email: "focusutra@gmail.com",
    phone: "9098216072",
    password: "",
    avatar: "",
  };

  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  //  Validation
  const validate = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email address";
      }
    }

    if (name === "phone") {
      if (!/^[0-9]{10}$/.test(value)) {
        error = "Phone must be 10 digits";
      }
    }

    return error;
  };

  //  Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    setIsDirty(true);
  };

  //  Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, avatar: preview }));
    setIsDirty(true);
  };

  //  Save
  const handleSave = () => {
    if (Object.values(errors).some(Boolean)) return;

    console.log("SAVED PROFILE 👉", form);
    setToastOpen(true);
    setIsDirty(false);

     
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Your Profile
        </Typography>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isDirty || Object.values(errors).some(Boolean)}
        >
          Save
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box display="flex" gap={4}>
        {/* LEFT FORM */}
        <Box flex={1}>
          {/* PROFILE IMAGE */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              src={form.avatar}
              sx={{ width: 80, height: 80 }}
            />
            <label htmlFor="upload-avatar">
              <input
                hidden
                accept="image/*"
                type="file"
                id="upload-avatar"
                onChange={handleImageUpload}
              />
              <IconButton color="primary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>

          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={form.firstName}
            onChange={handleChange}
          />

          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={form.lastName}
            onChange={handleChange}
          />

          <TextField
            label="Email ID"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            margin="normal"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </Box>

        {/* RIGHT PANEL */}
        <Paper sx={{ width: 340, p: 2 }}>
          <Typography fontWeight="bold" mb={1}>
            Storage Utilization
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Deleted images will be reduced from upload counts post 24 hours
          </Typography>

          <Typography variant="body2" fontWeight="bold">
            Storage Limit
          </Typography>
          <Typography variant="body2">
            73,903 of 200,000 Photos
          </Typography>
          <Typography variant="body2">
            0 of 6,000 MB
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography fontWeight="bold">Subscription</Typography>
          <Typography variant="body2" mb={1}>
            Essential
          </Typography>

          <Button variant="outlined" fullWidth>
            Upgrade
          </Button>
        </Paper>
      </Box>

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Profile saved successfully ✅
        </Alert>
      </Snackbar>
    </Box>
  );
}
