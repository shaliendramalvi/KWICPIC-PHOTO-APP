import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Stack,
  Badge,
  Dialog,
  DialogContent,
  TextField,
  Switch,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SecurityIcon from "@mui/icons-material/Security";
import SchoolIcon from "@mui/icons-material/School";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import NotificationMenu from "./NotificationMenu";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notifyAnchor, setNotifyAnchor] = useState(null);

  const [groupName, setGroupName] = useState("");
  const [sellPhotos, setSellPhotos] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  //  SYNC LOGIN STATE ON ROUTE CHANGE
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location.pathname]);

  const notifications = [
    {
      name: "Amit Sharma",
      action: "commented on your photo",
      message: "Bohot hi zabardast shot hai! Lighting aur framing dono top class 🔥",
      time: "5 mins ago",
    },
    {
      name: "Priya Verma",
      action: "liked your photo",
      message: null,
      time: "18 mins ago",
    },
    {
      name: "Rahul Mehta",
      action: "booked your wedding album",
      message: "Please call to discuss dates and pricing.",
      time: "42 mins ago",
    },
    {
      name: "Neha Kapoor",
      action: "sent you a message",
      message: "Loved your portfolio! Are you available next month?",
      time: "1 hour ago",
    },
    {
      name: "Vikas Singh",
      action: "started following you",
      message: null,
      time: "2 hours ago",
    },
    {
      name: "Anjali Patel",
      action: "shared your photo",
      message: "Shared this with my family group, everyone loved it 😊",
      time: "3 hours ago",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setProfileAnchor(null);
    setNotifyAnchor(null);
    navigate("/login");
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    setGroupName("");
    setSellPhotos(false);
    setShowAdvanced(false);
    setOpenCreate(false);
  };

  const handleJoinGroup = () => {
    if (!joinCode.trim()) return;
    setJoinCode("");
    setOpenJoin(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <Box
            onClick={() => navigate("/dashboard")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              flexGrow: 1,
            }}
          >
            <CameraAltOutlinedIcon sx={{ fontSize: 26, color: "primary.main" }} />
            <Typography fontWeight={600}>KwicPic</Typography>
          </Box>

          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setOpenJoin(true)}>
            Join Group
          </Button>

          <Button variant="contained" sx={{ mr: 2 }} onClick={() => setOpenCreate(true)}>
            Create Group
          </Button>

          {isLoggedIn ? (
            <>
              <IconButton onClick={(e) => setNotifyAnchor(e.currentTarget)}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>

              <NotificationMenu
                anchorEl={notifyAnchor}
                open={Boolean(notifyAnchor)}
                onClose={() => setNotifyAnchor(null)}
                notifications={notifications}
              />

              <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
                  <Typography fontSize={14}>Shubham Dubey</Typography>
                  <KeyboardArrowDownIcon />
                </Stack>
              </IconButton>
            </>
          ) : (
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
          >
            <MenuItem onClick={() => navigate("/business-settings/profile")}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              Business Settings
            </MenuItem>
            <MenuItem><ListItemIcon><BarChartIcon /></ListItemIcon>Analytics</MenuItem>
            <MenuItem><ListItemIcon><HelpOutlineIcon /></ListItemIcon>Help & Support</MenuItem>
            <MenuItem><ListItemIcon><SecurityIcon /></ListItemIcon>Privacy & Security</MenuItem>
            <MenuItem><ListItemIcon><SchoolIcon /></ListItemIcon>Tutorials</MenuItem>
            <MenuItem><ListItemIcon><InfoOutlinedIcon /></ListItemIcon>About</MenuItem>
            <Divider />
            <MenuItem sx={{ color: "error.main" }} onClick={handleLogout}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ================= CREATE GROUP MODAL ================= */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setOpenCreate(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography fontSize={18} fontWeight={600} mb={1}>
            Create Group
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <Box
            mt={2}
            px={1.5}
            py={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#f3f4f6"
            borderRadius={1.5}
            sx={{ cursor: "pointer" }}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Typography fontSize={13} fontWeight={500}>
              Advanced Settings
            </Typography>
            <Typography fontSize={12}>
              {showAdvanced ? "▲" : "▼"}
            </Typography>
          </Box>

          {showAdvanced && (
            <>
              <Divider sx={{ my: 1 }} />
              <Box
                px={1.5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize={13}>Sell and Buy Photos</Typography>
                <Switch
                  checked={sellPhotos}
                  onChange={(e) => setSellPhotos(e.target.checked)}
                />
              </Box>
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!groupName.trim()}
            onClick={handleCreateGroup}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>

      {/* ================= JOIN GROUP MODAL ================= */}
      <Dialog open={openJoin} onClose={() => setOpenJoin(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setOpenJoin(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Join Group
          </Typography>

          <TextField
            fullWidth
            label="Invite Code / Link"
            size="small"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!joinCode.trim()}
            onClick={handleJoinGroup}
          >
            Join
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
