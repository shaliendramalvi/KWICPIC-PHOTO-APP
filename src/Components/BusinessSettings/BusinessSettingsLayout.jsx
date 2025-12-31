import { Box, Paper, List, ListItemButton, ListItemText, Typography } from "@mui/material";
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
    <Box display="flex">
      {/* SIDEBAR */}
      <Paper sx={{ width: 260, p: 2 }}>
        <Typography fontWeight="bold" mb={2}>
          Business Settings
        </Typography>

        <List>
          {menu.map((m) => (
            <ListItemButton
              key={m.path}
              component={NavLink}
              to={m.path}
              sx={{
                "&.active": {
                  bgcolor: "primary.main",
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
