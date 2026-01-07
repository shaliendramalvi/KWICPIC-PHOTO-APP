import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Divider,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [sellPhotos, setSellPhotos] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [joinCode, setJoinCode] = useState("");

   const [groups, setGroups] = useState([
    {
      title: "TEJAS & PRINCY",
      img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
    },
    {
      title: "TEJAS",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552",
    },
    {
      title: "YOG & PRINCY",
      img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e",
    },
    {
      title: "PRINCY",
      img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
    },
    {
      title: "RAHUL & PRINCY",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      title: "RAJ & PRINCY",
      img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    },
    {
      title: "RAM & PRINCY",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    },
    {
      title: "LUV & PRINCY",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    },
     
  ]);

  /* CREATE GROUP */
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
    setShowAdvanced(false);
    setOpenCreate(false);
  };

  /* JOIN GROUP */
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", p: 3 }}>
      <Typography variant="h6" mb={2}>
        Groups
      </Typography>

      <Grid container spacing={3}>
        {groups.map((g, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              onClick={() => navigate(`/group/${i}`)}
              sx={{
                borderRadius: 2,
                cursor: "pointer",
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

      {/* CREATE GROUP MODAL */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setOpenCreate(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography fontWeight={600} mb={1}>
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
            onClick={() => setShowAdvanced(!showAdvanced)}
            sx={{ cursor: "pointer" }}
          >
            <Typography fontSize={13}>Advanced Settings</Typography>
            <Typography fontSize={12}>{showAdvanced ? "▲" : "▼"}</Typography>
          </Box>

          {showAdvanced && (
            <>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize={13}>Sell and Buy Photos</Typography>
                <Switch checked={sellPhotos} onChange={(e) => setSellPhotos(e.target.checked)} />
              </Box>
            </>
          )}

          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleCreateGroup}>
            Create
          </Button>
        </DialogContent>
      </Dialog>

      {/* JOIN GROUP MODAL */}
      <Dialog open={openJoin} onClose={() => setOpenJoin(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ position: "relative", p: 3 }}>
          <IconButton
            onClick={() => setOpenJoin(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography fontWeight={600} mb={2}>
            Join Group
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Invite Code / Link"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />

          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleJoinGroup}>
            Join
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
