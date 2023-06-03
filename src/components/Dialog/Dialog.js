import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { searchWord } from "../../utils/Dictionary/searchDictionary";
import {
  addBookmark,
  getBookmark,
} from "../../utils/Firebase/Bookmark/bookmark.firebase";
import "./Dialog.css";
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
export function SearchDialog({ isOpen, wordInfo, handleClose }) {
  //   let wordInfo = {};
  //   useEffect(async () => {
  //     wordInfo = await searchWord(wordToSearch);
  //     console.log(wordInfo);
  //   }, []);

  const [word, setWord] = React.useState("");
  const [firstSearch, setfirstSearch] = React.useState(true);
  //   const [word, setWord] = React.useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //   searchWord(word);
      // handleClose()
    }
  };
  const handleAddWord = async () => {
    console.log("adding start");
    await addBookmark(wordInfo);
    // setAddedWords(await getBookmark());
    // gotoNextPage();
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <img
            width="25%"
            height="25%"
            src="https://cdn.dribbble.com/users/2367833/screenshots/7816190/media/b1aaf5c98510012b56422d1619dc62e8.gif"
          ></img>
          <TextField
            fullWidth
            onKeyDown={handleKeyDown}
            value={word}
            onChange={(event) => {
              setWord(event.target.value);
              console.log(word);
            }}
            placeholder="Enter a word to look for!"
            sx={{ width: "20vw" }}
            InputProps={{
              sx: { borderRadius: 20, height: "5vh" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DialogTitle sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            {wordInfo.baseForm}
          </DialogTitle>

          <div style={{ marginLeft: "-1rem", color: "#666666" }}>
            · {wordInfo.pronounciation}
          </div>
        </Box>
        <DialogContent>
          <DialogContentText
            className=""
            sx={{
              fontSize: "1.2rem",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            {wordInfo.pos == "명사" && "noun"}
            {wordInfo.pos == "동사" && "verb"}
            {wordInfo.pos == "형용사" && "adjective"}
          </DialogContentText>
          <Box
            className="def"
            sx={{ marginLeft: "2rem", color: "black", fontSize: "1rem" }}
          >
            <div>1. {wordInfo.kor} </div>
            <div>a. {wordInfo.eng}</div>
            {/* <DialogContentText className="">1. {wordInfo.kor}</DialogContentText>
    <DialogContentText className="">a. {wordInfo.eng}</DialogContentText> */}
          </Box>
          <Box sx={{ color: "#666666", marginTop: "3rem" }}>
            {wordInfo.origin && "Origin: " + wordInfo.origin}
            <Box sx={{ display: "flex" }}>
              {wordInfo.grade && "Word Level: "}
              <Box
                sx={{
                  marginLeft: "0.5rem",
                  color:
                    wordInfo.grade == "Easy"
                      ? "green"
                      : wordInfo.grade == "Medium"
                      ? "#c6c625"
                      : "red",
                }}
              >
                {wordInfo.grade}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddWord}>Bookmark</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function WordDialog({ isOpen, wordInfo, handleClose }) {
  console.log("wordInfo: ", wordInfo);
  const handleAddWord = async () => {
    console.log("adding start");
    await addBookmark(wordInfo);
    // setAddedWords(await getBookmark());
    // gotoNextPage();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        PaperProps={{
          style: { borderRadius: "1rem" },
        }}
        // maxWidth="lg"
        // minWidth="lg"
      >
        <BootstrapDialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          className="title"
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {wordInfo.baseForm} ·
          <span className="pronounciation">{wordInfo.pronounciation}</span>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ fontSize: "0.8rem" }}>
          <div className="pos" style={{ fontSize: "1.1rem" }}>
            {wordInfo.pos == "명사" && "noun"}
            {wordInfo.pos == "동사" && "verb"}
            {wordInfo.pos == "형용사" && "adjective"}
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <Typography gutterBottom>1. {wordInfo.kor}</Typography>
            <Typography gutterBottom>a. {wordInfo.eng}</Typography>
          </div>
          <div className="extra" style={{ color: "#666666" }}>
            {wordInfo.origin && "origin: " + wordInfo.origin}
            {wordInfo.grade && "word Level: " + wordInfo.grade}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddWord}>
            Bookmark Word
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
