import Fab from "@mui/material/Fab";
import Icon from "@mui/icons-material/Search";
import * as React from "react";
import ActionButton from "./../ActionButton/ActionButton";

export default function SearchIcon() {
  const [open, setOpen] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const fabStyle = {
    position: "absolute",
    bottom: "1.5rem",
    right: "1.5rem",
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        style={fabStyle}
        onClick={() => setOpen(true)}
      >
        <Icon fontSize="large" />{" "}
      </Fab>
      <ActionButton
        isOpen={open}
        // wordInfo={wordInfo}
        handleClose={() => setOpen(false)}
      ></ActionButton>
    </>
  );
}
