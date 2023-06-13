import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Card.css";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const speak = (word) => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = word;
  utterance.lang = "ko-KR";
  utterance.pitch = 1;
  utterance.rate = 0.75;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};

export function QuizCard({ word }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: "2rem", textAlign: "center" }}
          color="text.secondary"
          gutterBottom
        >
          {word}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function WordCard({ wordInfo }) {
  // console.log(wordInfo);
  // console.log(wordInfo.baseForm);
  return (
    <Card
      sx={{
        height: "20%",
        width: "15%",
        border: "1px solid #d2d2d2",
        borderRadius: "1rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {wordInfo.baseForm}
          {/* <VolumeUpIcon
            sx={{ marginLeft: "0.5rem" }}
            onClick={() => speak(wordInfo.baseForm)}
          ></VolumeUpIcon> */}
          {/* be{bull}nev{bull}o{bull}lent */}
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: "1rem", fontStyle: "italic" }}
          color="text.secondary"
        >
          {/* adjective */}

          {wordInfo.pos == "명사" && "noun"}
          {wordInfo.pos == "동사" && "verb"}
          {wordInfo.pos == "형용사" && "adjective"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            minHeight: "5vh",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {/* {wordInfo.kor.length > 25
            ? wordInfo.kor.slice(0, 25) + "..."
            : wordInfo.kor} */}
          {wordInfo.kor}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            minHeight: "5vh",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          <br />
          {'"'}
          {wordInfo.eng}
          {'"'}
        </Typography>
      </CardContent>
      <Link href={wordInfo.link} target="_blank">
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Link>
    </Card>
  );
}

export function RecentWordCard({ wordInfo }) {
  return (
    <Card
      sx={{
        width: "23%",
        border: "1px solid #d2d2d2",
        borderRadius: "1rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div>
            {wordInfo.baseForm} {" ·"}&nbsp;
          </div>
          <div className="subText"> {wordInfo.pronounciation}</div>
          {/* be{bull}nev{bull}o{bull}lent */}
        </Typography>
        <Typography
          className="subText"
          sx={{ mb: 1.5, fontSize: "1rem", fontStyle: "italic" }}
          color="text.secondary"
        >
          {wordInfo.pos == "명사" && "noun"}
          {wordInfo.pos == "동사" && "verb"}
          {wordInfo.pos == "형용사" && "adjective"}
        </Typography>
        <Typography variant="body2">{wordInfo.kor}</Typography>
        <Typography variant="body2">
          <br />
          {'"'}
          {wordInfo.eng}
          {'"'}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
export function SongCard({ song }) {
  const { album_url, artist, title } = { ...song };
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        borderRadius: "1rem",
        border: "1px solid #d2d2d2",
        width: "23%",
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

export function RecentSongCard({ song }) {
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
          // sx={{ borderRadius: "1rem" }}
          component="img"
          height="140"
          image={album_url}
          alt={title}
        />
        <CardContent sx={{ marginBottom: "0rem" }}>
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
