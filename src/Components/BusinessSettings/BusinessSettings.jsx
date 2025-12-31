import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

export default function BusinessSettings() {
  return (
    <Box display="flex">
       <Paper sx={{ width: 260, height: "100vh", p: 2 }}>
        <Typography fontWeight="bold" mb={2}>
          Business Settings
        </Typography>

        <List>
          {[
            "Your Profile",
            "Account Preferences",
            "Business Branding",
            "Team Login",
            "Flipbook Settings",
            "Watermark",
            "Portfolio",
            "Kwikpic Wallet",
          ].map((item) => (
            <ListItemButton key={item}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* RIGHT CONTENT */}
      <Box flex={1} p={4}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Your Profile</Typography>
          <Button variant="contained">Save</Button>
        </Box>

        <Divider />

        <Box display="flex" gap={4} mt={3}>
          {/* PROFILE FORM */}
          <Box flex={1}>
            <TextField label="First Name" fullWidth margin="normal" value="Shubham" />
            <TextField label="Last Name" fullWidth margin="normal" value="Dubey" />
            <TextField label="Email ID" fullWidth margin="normal" />
            <TextField label="Phone Number" fullWidth margin="normal" />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value="********"
            />
          </Box>

          {/* STORAGE INFO */}
          <Paper sx={{ width: 320, p: 2 }}>
            <Typography fontWeight="bold">Storage Utilization</Typography>
            <Typography variant="body2" mt={1}>
              73,903 of 200,000 Photos
            </Typography>
            <Typography variant="body2">
              0 of 6,000 MB
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight="bold">Subscription</Typography>
            <Typography variant="body2">Essential</Typography>

            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              Upgrade
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
