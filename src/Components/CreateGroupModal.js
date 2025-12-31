import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Switch,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateGroupModal({ open, onClose, onCreate }) {
  const [groupName, setGroupName] = useState("");
  const [sellPhotos, setSellPhotos] = useState(false);

  const handleCreate = () => {
    const payload = {
      name: groupName,
      sellAndBuy: sellPhotos,
    };

    onCreate(payload);
    onClose();
    setGroupName("");
    setSellPhotos(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ position: "relative", p: 3 }}>
        {/* CLOSE BUTTON */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* TITLE */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Create Group
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Choose a unique name to help members recognize your group
        </Typography>

        {/* GROUP NAME */}
        <TextField
          fullWidth
          label="Enter group name"
          size="small"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        {/* ADVANCED SETTINGS */}
        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold">
            Advanced Settings
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2">
              Sell and Buy Photos
            </Typography>
            <Switch
              checked={sellPhotos}
              onChange={(e) => setSellPhotos(e.target.checked)}
            />
          </Box>
        </Box>

        {/* CREATE BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.2 }}
          disabled={!groupName.trim()}
          onClick={handleCreate}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
