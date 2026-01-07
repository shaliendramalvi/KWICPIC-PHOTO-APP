import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const menu = [
  { label: "Your Profile", path: "/business-settings/profile" },
  { label: "Account Preferences", path: "/business-settings/preferences" },
  { label: "Business Branding", path: "/business-settings/branding" },
  { label: "Team Login", path: "/business-settings/team-login" },
  { label: "Flipbook Settings", path: "/business-settings/flipbook" },
  { label: "Watermark", path: "/business-settings/watermark" },
  { label: "Portfolio", path: "/business-settings/portfolio" },
  { label: "Wallet", path: "/business-settings/wallet" },
];

export default function BusinessSettingsLayout() {
  return (
    <Box display="flex" bgcolor="#f8fafc">
      {/* SIDEBAR */}
      <Paper
        elevation={0}
        sx={{
          width: 260,
          borderRight: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography fontWeight={600} mb={2}>
          Business Settings
        </Typography>

        <List>
          {menu.map((m) => (
            <ListItemButton
              key={m.path}
              component={NavLink}
              to={m.path}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                "&.active": {
                  bgcolor: "primary.main",
                  color: "#fff",
                },
                "&.active .MuiListItemText-root": {
                  color: "#fff",
                },
              }}
            >
              <ListItemText primary={m.label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* CONTENT */}
      <Box flex={1} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
}
