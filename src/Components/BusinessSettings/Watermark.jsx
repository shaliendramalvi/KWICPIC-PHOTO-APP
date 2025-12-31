import { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Button,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Avatar,
  Grid,
} from "@mui/material";

const positions = [
  { label: "Top Left", value: "top-left" },
  { label: "Top Right", value: "top-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Bottom Center", value: "bottom-center" },
  { label: "Center", value: "center" },
];

export default function Watermark() {
  const [size, setSize] = useState(45);
  const [position, setPosition] = useState("bottom-right");
  const [logo, setLogo] = useState("");
  const [toast, setToast] = useState(false);

  // LOGO UPLOAD
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size allowed is 2MB");
      return;
    }

    const preview = URL.createObjectURL(file);
    setLogo(preview);
  };

  // SAVE
  const handleSave = () => {
    const payload = {
      size,
      position,
      logo,
    };

    console.log("WATERMARK SETTINGS ", payload);
    setToast(true);

    
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Watermark
        </Typography>

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box display="flex" gap={4}>
        {/* LEFT SIDE */}
        <Box flex={1}>
          {/* SIZE RANGE */}
          <Typography fontWeight="bold" mb={1}>
            Size Range
          </Typography>

          <Box px={1}>
            <Slider
              value={size}
              min={1}
              max={99}
              onChange={(e, v) => setSize(v)}
              valueLabelDisplay="on"
            />
          </Box>

          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="body2">1</Typography>
            <Typography variant="body2">99</Typography>
          </Box>

          {/* POSITION */}
          <Typography fontWeight="bold" mb={1}>
            Position
          </Typography>

          <Grid container spacing={2}>
            {positions.map((p) => (
              <Grid item xs={4} key={p.value}>
                <Paper
                  onClick={() => setPosition(p.value)}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    border:
                      position === p.value
                        ? "2px solid #1976d2"
                        : "1px solid #ccc",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">
                    {p.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* RIGHT SIDE */}
        <Paper sx={{ width: 360, p: 2 }}>
          <Typography fontWeight="bold" mb={1}>
            Logo
          </Typography>

          <Box
            sx={{
              border: "1px dashed #1976d2",
              p: 3,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Avatar
              src={logo}
              sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />

            <Button variant="outlined" component="label">
              Browse
              <input
                hidden
                type="file"
                accept="image/png"
                onChange={handleLogoUpload}
              />
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
            >
              We recommend using PNG format
              <br />
              Maximum size allowed is 2MB
            </Typography>
          </Box>
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
          Watermark settings saved successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
