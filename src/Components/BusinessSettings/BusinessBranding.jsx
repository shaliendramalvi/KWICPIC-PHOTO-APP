import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  Button,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";

export default function BusinessBranding() {
  //  FORM STATE 
  const [form, setForm] = useState({
    businessName: "The FocusSutra Studio",
    website: "https://weblink.com",
    instagram: "https://www.instagram.com/thefocusutra",
    facebook: "https://facebook.com/businessname",
    logo: "",
  });

  const [toggles, setToggles] = useState({
    website: true,
    instagram: true,
    facebook: false,
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // VALIDATION
  const validateUrl = (name, value) => {
    if (!toggles[name]) return "";
    if (!/^https?:\/\/.+\..+/.test(value)) {
      return "Invalid URL";
    }
    return "";
  };

  //  INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateUrl(name, value) });
  };

  // TOGGLE
  const handleToggle = (name) => {
    setToggles({ ...toggles, [name]: !toggles[name] });
  };

  //  LOGO UPLOAD
  const handleLogo = (file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm({ ...form, logo: preview });
  };

  //  DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleLogo(e.dataTransfer.files[0]);
  };

  //  SAVE
  const handleSave = () => {
    if (Object.values(errors).some(Boolean)) return;

    console.log("PUBLIC BRANDING DATA ", { form, toggles });
    setToast(true);
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Business Branding
        </Typography>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={Object.values(errors).some(Boolean)}
        >
          Save
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box display="flex" gap={4}>
        {/* LEFT FORM */}
        <Box flex={1}>
          {/* LOGO UPLOAD */}
          <Typography fontWeight="bold" mb={1}>
            Business Logo
          </Typography>

          <Box
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            sx={{
              border: "2px dashed #1976d2",
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              mb: 2,
              bgcolor: dragActive ? "#e3f2fd" : "transparent",
            }}
          >
            <Avatar
              src={form.logo}
              sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />

            <Typography variant="body2">
              Drag & drop logo here or{" "}
              <label style={{ color: "#1976d2", cursor: "pointer" }}>
                browse
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogo(e.target.files[0])}
                />
              </label>
            </Typography>
          </Box>

          <TextField
            label="Business Name"
            fullWidth
            margin="normal"
            value={form.businessName}
            onChange={(e) =>
              setForm({ ...form, businessName: e.target.value })
            }
          />

          {/* WEBSITE */}
          <Switch
            checked={toggles.website}
            onChange={() => handleToggle("website")}
          />
          Website
          <TextField
            fullWidth
            margin="normal"
            name="website"
            value={form.website}
            onChange={handleChange}
            disabled={!toggles.website}
            error={!!errors.website}
            helperText={errors.website}
          />

          {/* INSTAGRAM */}
          <Switch
            checked={toggles.instagram}
            onChange={() => handleToggle("instagram")}
          />
          Instagram
          <TextField
            fullWidth
            margin="normal"
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            disabled={!toggles.instagram}
            error={!!errors.instagram}
            helperText={errors.instagram}
          />

          {/* FACEBOOK */}
          <Switch
            checked={toggles.facebook}
            onChange={() => handleToggle("facebook")}
          />
          Facebook
          <TextField
            fullWidth
            margin="normal"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            disabled={!toggles.facebook}
            error={!!errors.facebook}
            helperText={errors.facebook}
          />
        </Box>

        {/* RIGHT PREVIEW */}
        <Paper sx={{ width: 360, p: 2 }}>
          <Typography fontWeight="bold" mb={2}>
            Public Gallery Branding Preview
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Avatar
              src={form.logo}
              sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
            />

            <Typography fontWeight="bold">
              Album by {form.businessName}
            </Typography>

            {toggles.website && (
              <Typography variant="body2" color="primary">
                {form.website}
              </Typography>
            )}

            {toggles.instagram && (
              <Typography variant="body2" color="primary">
                {form.instagram}
              </Typography>
            )}
          </Paper>
        </Paper>
      </Box>

      {/* TOAST */}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Public branding saved successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
