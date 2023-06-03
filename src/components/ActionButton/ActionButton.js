import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { parseStringPromise } from "xml2js";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import WordDialog from "../Dialog/Dialog";
import { SearchDialog } from "../Dialog/Dialog";
import { fontSize } from "@mui/system";

export default function ActionButton({ isOpen, handleClose }) {
  const [word, setWord] = React.useState("");
  //   const [searchBoxOpen, setSeachBoxOpen] = React.useState(isOpen);
  const [dialogOpen, setDialogOpen] = React.useState();
  const [wordInfo, setWordInfo] = React.useState({});
  const getKoreanDefinition = async (word) => {
    const url = "https://krdict.korean.go.kr/api/search";
    const key = "CB4BED3D7805E0C81E978DC973449090";
    // event.stopPropagation();
    const q = word;
    const translated = "y";
    const trans_lang = "1";
    const response = await fetch(
      `${url}?key=${key}&q=${q}&translated=${translated}&trans_lang=${trans_lang}`
    );
    // console.log(response);
    const text = await response.text();
    const json = await parseStringPromise(text);
    const item = json.channel.item?.[0];
    let pronounciation;
    let origin;
    let wordGrade;
    let tempWordInfo = {};
    // if word is searched
    if (item) {
      tempWordInfo.baseForm = item.word[0];
      tempWordInfo.baseFormEng =
        json.channel.item?.[0].sense?.[0].translation?.[0].trans_word[0];
      tempWordInfo.pos = item.pos[0];
      tempWordInfo.link = item.link[0];
      tempWordInfo.kor = json.channel.item?.[0].sense?.[0].definition[0];
      tempWordInfo.eng =
        json.channel.item?.[0].sense?.[0].translation?.[0].trans_dfn[0];
      if (item.pronunciation) {
        pronounciation = item.pronunciation[0];
        tempWordInfo.pronounciation = pronounciation;
      }
      if (item.origin) {
        origin = item.origin[0];
        tempWordInfo.origin = origin;
      }
      if (item.word_grade) {
        if (item.word_grade[0] == "초급") {
          wordGrade = "Easy";
        } else if (item.word_grade[0] == "중급") {
          wordGrade = "Medium";
        } else {
          wordGrade = "Difficult";
        }
        // wordGrade = item.word_grade[0];
        tempWordInfo.grade = wordGrade;
      }
      setWordInfo(tempWordInfo);
      console.log(wordInfo);
      handleClose();
      setDialogOpen(true);
      //   console.log(open);
    } else {
      // change alert to MUI modal
      alert("No definition found");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getKoreanDefinition(word);
    }
  };
  return (
    <Box
      sx={{
        //   borderRaidus: "1rem",
        borderRadius: "5rem",
      }}
    >
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
            marginTop: "2rem",
          }}
        >
          My K Star Dictionary
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText>
            Find meanings and save for quick reference
          </DialogContentText>

          <img
            width="100%"
            height="100%"
            src="https://cdn.dribbble.com/users/2367833/screenshots/7816190/media/b1aaf5c98510012b56422d1619dc62e8.gif"
          ></img>

          <TextField
            onKeyDown={handleKeyDown}
            value={word}
            onChange={(event) => {
              setWord(event.target.value);
              console.log(word);
            }}
            placeholder="Enter a word to look for!"
            sx={{ width: "20vw", marginBottom: "2rem" }}
            InputProps={{
              sx: { borderRadius: 20, height: "7vh" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
      {/* <WordDialog
        isOpen={dialogOpen}
        wordInfo={wordInfo}
        handleClose={() => setDialogOpen(false)}
      ></WordDialog> */}
      <SearchDialog
        isOpen={dialogOpen}
        wordInfo={wordInfo}
        // wordToSearch={word}
        handleClose={() => setDialogOpen(false)}
      ></SearchDialog>
    </Box>
  );
}
