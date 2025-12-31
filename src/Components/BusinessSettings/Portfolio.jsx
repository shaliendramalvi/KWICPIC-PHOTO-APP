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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function Portfolio() {
  const [enabled, setEnabled] = useState(true);
  const [toast, setToast] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  //  FORM STATE
  const [form, setForm] = useState({
    portfolioName: "Focus Portfolio",
    customUrl: "https://portfolio.kwikpic.in/focus",
    description: "Wedding & Portrait Photography",
    seoTitle: "Best Wedding Photographer | Focus",
    metaDescription: "Professional wedding & portrait photography portfolio",
    passwordProtected: false,
    password: "",
    coverImage: "",
  });

  // MOCK GALLERIES
  const galleries = [
    "Wedding Shoots",
    "Pre Wedding",
    "Portraits",
    "Baby Shoot",
    "Events",
  ];

  const [selectedGalleries, setSelectedGalleries] = useState([
    "Wedding Shoots",
    "Portraits",
  ]);

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // COVER IMAGE UPLOAD
  const handleCover = (file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm({ ...form, coverImage: preview });
  };

  //  DRAG & DROP
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleCover(e.dataTransfer.files[0]);
  };

  //  GALLERY SELECT
  const toggleGallery = (name) => {
    setSelectedGalleries((prev) =>
      prev.includes(name)
        ? prev.filter((g) => g !== name)
        : [...prev, name]
    );
  };

  //  SAVE
  const handleSave = () => {
    const payload = {
      enabled,
      form,
      selectedGalleries,
    };

    console.log("PORTFOLIO PAYLOAD ", payload);
    setToast(true);

    };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Portfolio
        </Typography>

        <Button variant="contained" onClick={handleSave} disabled={!enabled}>
          Save
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box display="flex" gap={4}>
        {/* LEFT SETTINGS */}
        <Box flex={1}>
          {/* ENABLE */}
          <FormControlLabel
            control={
              <Switch
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
              />
            }
            label="Enable Public Portfolio"
          />

          <TextField
            label="Portfolio Name"
            name="portfolioName"
            fullWidth
            margin="normal"
            value={form.portfolioName}
            onChange={handleChange}
            disabled={!enabled}
          />

          <TextField
            label="Custom URL"
            name="customUrl"
            fullWidth
            margin="normal"
            value={form.customUrl}
            onChange={handleChange}
            disabled={!enabled}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={form.description}
            onChange={handleChange}
            disabled={!enabled}
          />

          {/* SEO */}
          <Typography fontWeight="bold" mt={3}>
            SEO Settings
          </Typography>

          <TextField
            label="SEO Title"
            name="seoTitle"
            fullWidth
            margin="normal"
            value={form.seoTitle}
            onChange={handleChange}
            disabled={!enabled}
          />

          <TextField
            label="Meta Description"
            name="metaDescription"
            fullWidth
            margin="normal"
            value={form.metaDescription}
            onChange={handleChange}
            disabled={!enabled}
          />

          {/* PASSWORD */}
          <FormControlLabel
            control={
              <Switch
                checked={form.passwordProtected}
                onChange={() =>
                  setForm({
                    ...form,
                    passwordProtected: !form.passwordProtected,
                    password: "",
                  })
                }
              />
            }
            label="Password Protect Portfolio"
          />

          {form.passwordProtected && (
            <TextField
              label="Portfolio Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
            />
          )}

          {/* GALLERY SELECTION */}
          <Typography fontWeight="bold" mt={3}>
            Select Galleries
          </Typography>

          {galleries.map((g) => (
            <FormControlLabel
              key={g}
              control={
                <Checkbox
                  checked={selectedGalleries.includes(g)}
                  onChange={() => toggleGallery(g)}
                />
              }
              label={g}
            />
          ))}
        </Box>

        {/* RIGHT PREVIEW */}
        <Paper sx={{ width: 360, p: 2 }}>
          <Typography fontWeight="bold" mb={1}>
            Portfolio Preview
          </Typography>

          {/* COVER IMAGE */}
          <Box
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            sx={{
              border: "2px dashed #1976d2",
              p: 2,
              textAlign: "center",
              borderRadius: 2,
              mb: 2,
              bgcolor: dragActive ? "#e3f2fd" : "transparent",
            }}
          >
            <Avatar
              src={form.coverImage}
              variant="rounded"
              sx={{ width: "100%", height: 140, mb: 1 }}
            />

            <Typography variant="body2">
              Drag & drop cover image or{" "}
              <label style={{ color: "#1976d2", cursor: "pointer" }}>
                browse
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCover(e.target.files[0])}
                />
              </label>
            </Typography>
          </Box>

          <Typography fontWeight="bold">
            {form.portfolioName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {form.description}
          </Typography>

          <Typography variant="body2" color="primary" mt={1}>
            {form.customUrl}
          </Typography>

          {form.passwordProtected && (
            <Typography variant="body2" color="error" mt={1}>
              🔒 Password Protected
            </Typography>
          )}
        </Paper>
      </Box>

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Portfolio saved successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
