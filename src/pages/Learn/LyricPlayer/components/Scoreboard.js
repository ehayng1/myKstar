import { useNavigate } from "react-router-dom";
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {}

export const Scoreboard = ({ scoreState, audioRef }) => {
  const navigate = useNavigate();

  const [score, setScore] = scoreState;
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    score && (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
           Open dialog
         </Button> */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Modal title
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography
              gutterBottom
              sx={{ fontSize: "2rem", textAlign: "center" }}
            >
              {score < 30 && "Practice More!"}
              {score < 50 && "You are a good singer!"}
              {score > 80 && "You are a great singer!"}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                fontSize: "1.2rem",
                textAlign: "center",
                marginTop: "1.5rem",
              }}
            >
              Your score: {score}
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setScore(null);
                audioRef.current.controls = true;
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }}
            >
              Practice Again
            </Button>
            <Button autoFocus onClick={() => navigate("/learn")}>
              Other songs
            </Button>
            <Button autoFocus onClick={handleClose}>
              Scoreboard
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    )
  );

  // return score && (
  //   <div className="score">
  //     <>
  //       <h1 className="scoreDisplay"> Your score: <br /> 🎤 {score} 🎤</h1>
  //       <div className="scoreBoardNavBtn">
  //         <button onClick={() => navigate("/scoreboard")}>Scoreboard</button>
  //         {/* TODO for Minjun */}
  //         <button onClick={() => {
  //           setScore(null);
  //           audioRef.current.controls = true;
  //           audioRef.current.currentTime = 0;
  //           audioRef.current.play();
  //         }
  //         }>Practice Again</button>
  //         <button onClick={() => navigate("/learn")}>Other songs</button>
  //       </div>
  //     </>
  //   </div>
  // )
};
