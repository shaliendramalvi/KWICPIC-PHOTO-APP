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
  Select,
  MenuItem,
} from "@mui/material";

export default function AccountPreferences() {
  const [toast, setToast] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    defaultPrivacy: "private",
    language: "en",
    timezone: "Asia/Kolkata",
    autoLogout: true,
  });

  const handleToggle = (name) => {
    setSettings({ ...settings, [name]: !settings[name] });
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("ACCOUNT PREFERENCES ", settings);
    setToast(true);

    
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Account Preferences
        </Typography>

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Paper sx={{ p: 3, maxWidth: 700 }}>
        {/* NOTIFICATIONS */}
        <Typography fontWeight="bold" mb={1}>
          Notifications
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
          }
          label="Email Notifications"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />
          }
          label="SMS Notifications"
        />

        <Divider sx={{ my: 3 }} />

        {/* PRIVACY */}
        <Typography fontWeight="bold" mb={1}>
          Default Privacy
        </Typography>

        <Select
          fullWidth
          name="defaultPrivacy"
          value={settings.defaultPrivacy}
          onChange={handleChange}
        >
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="password">Password Protected</MenuItem>
        </Select>

        <Divider sx={{ my: 3 }} />

        {/* LANGUAGE */}
        <Typography fontWeight="bold" mb={1}>
          Language
        </Typography>

        <Select
          fullWidth
          name="language"
          value={settings.language}
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
        </Select>

        <Divider sx={{ my: 3 }} />

        
        <Typography fontWeight="bold" mb={1}>
          Timezone
        </Typography>

        <Select
          fullWidth
          name="timezone"
          value={settings.timezone}
          onChange={handleChange}
        >
          <MenuItem value="Asia/Kolkata">India (IST)</MenuItem>
          <MenuItem value="UTC">UTC</MenuItem>
          <MenuItem value="America/New_York">USA (EST)</MenuItem>
        </Select>

        <Divider sx={{ my: 3 }} />

        {/* SECURITY */}
        <Typography fontWeight="bold" mb={1}>
          Security
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={settings.autoLogout}
              onChange={() => handleToggle("autoLogout")}
            />
          }
          label="Auto logout after inactivity"
        />
      </Paper>

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Account preferences saved successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
