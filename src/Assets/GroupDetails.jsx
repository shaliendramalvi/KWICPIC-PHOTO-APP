import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Dialog,
} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import DownloadIcon from "@mui/icons-material/Download";

/* GROUP DATA (NO ID REQUIRED) */
const GROUP = {
  title: "TEJAS & PRINCY",
  albumBy: "The Focusutra Studio",
  cover: "https://picsum.photos/1400/500?1",
  photos: [
    "https://picsum.photos/800/1000?11",
    "https://picsum.photos/800/1000?12",
    "https://picsum.photos/800/1000?13",
  ],
};

export default function GroupDetails() {
  const fileInputRef = useRef();

  const [liked, setLiked] = useState(false);
  const [zoom, setZoom] = useState(1);

  const [openViewer, setOpenViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const photos = [...GROUP.photos, ...uploadedPhotos];

  /*  Upload images */
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setUploadedPhotos((prev) => [...prev, ...urls]);
  };

  /*  Download */
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = photos[activeIndex];
    link.download = "photo.jpg";
    link.click();
  };

  const openImage = (index) => {
    setActiveIndex(index);
    setZoom(1);
    setOpenViewer(true);
  };

  const nextImage = () =>
    setActiveIndex((prev) => (prev + 1) % photos.length);

  const prevImage = () =>
    setActiveIndex((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* COVER */}
      <Box
        sx={{
          height: 320,
          backgroundImage: `url(${GROUP.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* INFO BAR */}
      <Box
        sx={{
          bgcolor: "#fff",
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Box>
          <Typography fontWeight={600}>{GROUP.title}</Typography>

          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Typography fontSize={12}>
              {photos.length} Photos
            </Typography>

            <IconButton
              size="small"
              onClick={() => fileInputRef.current.click()}
            >
              <CloudUploadOutlinedIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </IconButton>
          </Stack>
        </Box>

        <Typography fontSize={13}>
          Album by {GROUP.albumBy}
        </Typography>
      </Box>

      {/* GRID */}
      <Box p={3}>
        <Grid container spacing={2}>
          {photos.map((img, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                onClick={() => openImage(i)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia component="img" height="360" image={img} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleUpload}
      />

      {/* FULLSCREEN VIEWER */}
      <Dialog open={openViewer} fullScreen>
        <Box
          sx={{
            bgcolor: "#000",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* TOP CONTROLS */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            <IconButton
              onClick={() => setZoom((z) => z + 0.2)}
              sx={{ color: "#fff" }}
            >
              <ZoomInIcon />
            </IconButton>

            <IconButton
              onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
              sx={{ color: "#fff" }}
            >
              <ZoomOutIcon />
            </IconButton>

            <IconButton
              onClick={handleDownload}
              sx={{ color: "#fff" }}
            >
              <DownloadIcon />
            </IconButton>

            <IconButton
              onClick={() => setOpenViewer(false)}
              sx={{ color: "#fff" }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* LEFT ARROW */}
          <IconButton
            onClick={prevImage}
            sx={{ position: "absolute", left: 20, color: "#fff" }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* IMAGE + WATERMARK */}
          <Box position="relative">
            <img
              src={photos[activeIndex]}
              alt=""
              style={{
                transform: `scale(${zoom})`,
                transition: "0.3s",
                maxHeight: "90vh",
                maxWidth: "90vw",
              }}
            />

            <Typography
              sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
              }}
            >
              © KwicPic
            </Typography>
          </Box>

          {/* RIGHT ARROW */}
          <IconButton
            onClick={nextImage}
            sx={{ position: "absolute", right: 20, color: "#fff" }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
}
