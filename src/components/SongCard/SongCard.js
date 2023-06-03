import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SongCard({ song }) {
  const { album_url, artist, title } = { ...song };
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "1rem",
        border: "1px solid #d2d2d2",
        minWidth: "20%",
      }}
      onClick={() => {
        navigate("/lyric-player", { state: { song } });
      }}
    >
      <CardActionArea sx={{}}>
        <CardMedia
          sx={{ borderRadius: "1rem" }}
          component="img"
          height="140"
          image={album_url}
          alt={title}
        />
        <CardContent sx={{ marginBottom: "1.5rem" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
