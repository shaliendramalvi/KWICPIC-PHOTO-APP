import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
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

export default function Dashboard() {
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [notifyAnchor, setNotifyAnchor] = useState(null);

  const [groupName, setGroupName] = useState("");
  const [sellPhotos, setSellPhotos] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const [groups, setGroups] = useState([
    { title: "TEJAS & PRINCIY", img: "https://picsum.photos/400/250?1" },
    { title: "JANVI & KRISHNA", img: "https://picsum.photos/400/250?2" },
  ]);

  const notifications = [
    "New client joined Wedding Album",
    "Payment received ₹8,000",
  ];

  // CREATE GROUP
  const handleCreateGroup = () => {
    if (!groupName.trim()) return;

    setGroups((prev) => [
      ...prev,
      {
        title: groupName,
        img: "https://picsum.photos/400/250?" + Date.now(),
      },
    ]);

    setGroupName("");
    setSellPhotos(false);
    setOpenCreate(false);
  };

  // JOIN GROUP
  const handleJoinGroup = () => {
    if (!joinCode.trim()) return;

    setGroups((prev) => [
      ...prev,
      {
        title: `Joined Group (${joinCode})`,
        img: "https://picsum.photos/400/250?" + Date.now(),
      },
    ]);

    setJoinCode("");
    setOpenJoin(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* ================= HEADER ================= */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} fontWeight={600}>
            KwicPic
          </Typography>

          {/* JOIN GROUP */}
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => setOpenJoin(true)}
          >
            Join Group
          </Button>

          {/* CREATE GROUP */}
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => setOpenCreate(true)}
          >
            Create Group
          </Button>

          {/* NOTIFICATIONS */}
          <IconButton onClick={(e) => setNotifyAnchor(e.currentTarget)}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifyAnchor}
            open={Boolean(notifyAnchor)}
            onClose={() => setNotifyAnchor(null)}
          >
            {notifications.map((n, i) => (
              <MenuItem key={i}>{n}</MenuItem>
            ))}
          </Menu>

          {/* PROFILE DROPDOWN */}
          <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
              <Typography fontSize={14}>Shubham Dubey</Typography>
              <KeyboardArrowDownIcon />
            </Stack>
          </IconButton>

          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
          >
            <MenuItem
              onClick={() => {
                navigate("/business-settings/profile");
                setProfileAnchor(null);
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Business Settings
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              Analytics
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              Help & Support
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              Privacy & Security
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              Tutorials
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              About
            </MenuItem>

            <Divider />

            <MenuItem sx={{ color: "error.main" }}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* GROUPS */}
      <Box p={3}>
        <Typography variant="h6" mb={2}>
          Groups
        </Typography>

        <Grid container spacing={3}>
          {groups.map((g, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia component="img" height="180" image={g.img} />
                <CardContent>
                  <Typography fontWeight="bold">{g.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    12 Participants
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= CREATE GROUP MODAL ================= */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setOpenCreate(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Create Group
          </Typography>

          <TextField
            fullWidth
            label="Group name"
            size="small"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="body2">Sell and Buy Photos</Typography>
            <Switch
              checked={sellPhotos}
              onChange={(e) => setSellPhotos(e.target.checked)}
            />
          </Box>

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

      {/*JOIN GROUP MODAL*/}
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
    </Box>
  );
}
