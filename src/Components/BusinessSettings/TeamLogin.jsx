import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";

const PERMISSIONS = [
  "Upload Photos",
  "Delete Photos",
  "Create Albums",
  "Download Photos",
  "Manage Clients",
];

export default function TeamLogin() {
  const [toast, setToast] = useState(false);
  const [permissionUser, setPermissionUser] = useState(null);

  //TEAM MEMBERS
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit@gmail.com",
      role: "Editor",
      active: true,
      twoFA: true,
      permissions: ["Upload Photos", "Create Albums"],
      logs: ["Login from Chrome · Today 10:12 AM"],
    },
    {
      id: 2,
      name: "Pooja Verma",
      email: "pooja@gmail.com",
      role: "Manager",
      active: true,
      twoFA: false,
      permissions: PERMISSIONS,
      logs: ["Login from Mobile · Yesterday 8:40 PM"],
    },
  ]);

  //  INVITE FORM
  const [invite, setInvite] = useState({
    name: "",
    email: "",
    role: "Editor",
  });

  //  INVITE MEMBER
  const inviteMember = () => {
    if (!invite.name || !invite.email) return;

    setMembers([
      ...members,
      {
        id: Date.now(),
        ...invite,
        active: true,
        twoFA: false,
        permissions: [],
        logs: [],
      },
    ]);

    setInvite({ name: "", email: "", role: "Editor" });
    setToast(true);

   };

  // ROLE CHANGE
  const changeRole = (id, role) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, role } : m
      )
    );
  };

  // TOGGLE ACTIVE
  const toggleActive = (id) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m
      )
    );
  };

  //  TOGGLE 2FA
  const toggle2FA = (id) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, twoFA: !m.twoFA } : m
      )
    );
  };

  //  DELETE
  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  //  PERMISSION TOGGLE
  const togglePermission = (perm) => {
    setPermissionUser({
      ...permissionUser,
      permissions: permissionUser.permissions.includes(perm)
        ? permissionUser.permissions.filter((p) => p !== perm)
        : [...permissionUser.permissions, perm],
    });
  };

  //  SAVE PERMISSIONS
  const savePermissions = () => {
    setMembers(
      members.map((m) =>
        m.id === permissionUser.id ? permissionUser : m
      )
    );
    setPermissionUser(null);
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Team Login
        </Typography>
        <Button variant="contained" onClick={inviteMember}>
          Invite Member
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* INVITE */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography fontWeight="bold" mb={2}>
          Invite Team Member
        </Typography>

        <Box display="flex" gap={2}>
          <TextField
            label="Name"
            fullWidth
            value={invite.name}
            onChange={(e) =>
              setInvite({ ...invite, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            value={invite.email}
            onChange={(e) =>
              setInvite({ ...invite, email: e.target.value })
            }
          />
          <Select
            value={invite.role}
            onChange={(e) =>
              setInvite({ ...invite, role: e.target.value })
            }
          >
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Photographer">Photographer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </Box>
      </Paper>

      {/* TEAM TABLE */}
      <Paper sx={{ p: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          Team Members
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>2FA</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>

                <TableCell>
                  <Select
                    size="small"
                    value={m.role}
                    onChange={(e) =>
                      changeRole(m.id, e.target.value)
                    }
                  >
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Photographer">
                      Photographer
                    </MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  <Switch
                    checked={m.twoFA}
                    onChange={() => toggle2FA(m.id)}
                  />
                </TableCell>

                <TableCell>
                  <Switch
                    checked={m.active}
                    onChange={() => toggleActive(m.id)}
                  />
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => setPermissionUser(m)}
                  >
                    <SecurityIcon />
                  </IconButton>

                  <IconButton>
                    <EmailIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => removeMember(m.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* PERMISSION MODAL */}
      <Dialog open={!!permissionUser} onClose={() => setPermissionUser(null)}>
        <DialogTitle>Permissions</DialogTitle>
        <DialogContent>
          {permissionUser &&
            PERMISSIONS.map((p) => (
              <Box key={p}>
                <Checkbox
                  checked={permissionUser.permissions.includes(p)}
                  onChange={() => togglePermission(p)}
                />
                {p}
              </Box>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPermissionUser(null)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={savePermissions}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS TOAST */}
      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Team action completed successfully 
        </Alert>
      </Snackbar>
    </Box>
  );
}
