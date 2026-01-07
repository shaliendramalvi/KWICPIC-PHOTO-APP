import { Menu, Box, Typography, Divider } from "@mui/material";

export default function NotificationMenu({
  anchorEl,
  open,
  onClose,
  notifications,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          borderRadius: 2,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
          p: 1,
        },
      }}
    >
      {notifications.map((n, i) => (
        <Box key={i}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            px={1}
            py={1.2}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#f5f7fa",
                borderRadius: 1,
              },
            }}
          >
            {/* LEFT CONTENT */}
            <Box>
              <Typography fontSize={14} fontWeight={600} color="primary">
                {n.name}
              </Typography>

              <Typography fontSize={12} color="text.secondary">
                {n.action}
              </Typography>

              {n.message && (
                <Typography fontSize={13} mt={0.5}>
                  {n.message}
                </Typography>
              )}
            </Box>

            {/* TIME */}
            <Typography
              fontSize={11}
              color="text.secondary"
              sx={{ whiteSpace: "nowrap", ml: 1 }}
            >
              {n.time}
            </Typography>
          </Box>

          {i !== notifications.length - 1 && <Divider />}
        </Box>
      ))}
    </Menu>
  );
}
