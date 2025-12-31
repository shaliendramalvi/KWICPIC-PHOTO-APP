import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Button,
  Divider,
  Paper,
  Snackbar,
  Alert,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

export default function FlipbookSettings() {
  const [enabled, setEnabled] = useState(true);
  const [toast, setToast] = useState(false);

  const [settings, setSettings] = useState({
    animation: "page-flip",
    backgroundColor: "#ffffff",
    showPageNumber: true,
    allowDownload: false,
    passwordProtected: false,
    password: "",
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("FLIPBOOK SETTINGS ", { enabled, settings });
    setToast(true);

   };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Flipbook Settings
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
            label="Enable Flipbook"
          />

          {/* ANIMATION */}
          <Typography fontWeight="bold" mt={2}>
            Page Flip Animation
          </Typography>

          <Select
            fullWidth
            margin="dense"
            name="animation"
            value={settings.animation}
            onChange={handleChange}
            disabled={!enabled}
          >
            <MenuItem value="page-flip">Page Flip</MenuItem>
            <MenuItem value="fade">Fade</MenuItem>
            <MenuItem value="slide">Slide</MenuItem>
          </Select>

          {/* BACKGROUND */}
          <Typography fontWeight="bold" mt={3}>
            Background Color
          </Typography>

          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              setSettings({ ...settings, backgroundColor: e.target.value })
            }
            disabled={!enabled}
            style={{
              width: 60,
              height: 40,
              border: "none",
              marginTop: 8,
            }}
          />

          {/* OPTIONS */}
          <Box mt={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showPageNumber}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      showPageNumber: !settings.showPageNumber,
                    })
                  }
                />
              }
              label="Show Page Numbers"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settings.allowDownload}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      allowDownload: !settings.allowDownload,
                    })
                  }
                />
              }
              label="Allow Download"
            />
          </Box>

          {/* PASSWORD */}
          <FormControlLabel
            control={
              <Switch
                checked={settings.passwordProtected}
                onChange={() =>
                  setSettings({
                    ...settings,
                    passwordProtected: !settings.passwordProtected,
                    password: "",
                  })
                }
              />
            }
            label="Password Protect Flipbook"
          />

          {settings.passwordProtected && (
            <TextField
              label="Flipbook Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              value={settings.password}
              onChange={handleChange}
            />
          )}
        </Box>

        {/* RIGHT PREVIEW */}
        <Paper sx={{ width: 360, p: 2 }}>
          <Typography fontWeight="bold" mb={1}>
            Flipbook Preview
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: settings.backgroundColor,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              📖 Flipbook Preview
              <br />
              Animation: {settings.animation}
            </Typography>
          </Paper>

          {settings.passwordProtected && (
            <Typography
              variant="body2"
              color="error"
              mt={1}
            >
              Password Protected
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
          Flipbook settings saved successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
