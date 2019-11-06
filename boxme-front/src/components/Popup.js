import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Input from "@material-ui/core/Input";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { textAlign } from "@material-ui/system";
import { Container } from "@material-ui/core";
import request from 'superagent' 

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function Popup() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Fab
        aria-label="add"
        onClick={handleClick}
        style={{
          color: "#FFCE8D",
          backgroundColor: "#FFFFFF",
          position: "fixed",
          bottom: "50px",
          right: "50px"
        }}
      >
        <AddIcon />
      </Fab>
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
      >
        <SnackbarContent
          style={{ backgroundColor: "#FFCE8D", color: "#6F461F" }}
          message={
            <span id="message-id">
              <p style={{ fontWeight: "500", fontSize: "18px" }}>Crear Caja</p>
              <Input
                disableUnderline={true}
                placeholder="Nombre de la Caja..."
                style={{ backgroundColor: "#FFFFFF", borderRadius: "7px" }}
              />
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              className={classes.close}
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
            <Button
              size="small"
              style={{
                color: "#FFFFFF",
                borderRadius: "50px",
                backgroundColor: "#6F461F"
              }}
              href='/caja'
            >
              Agregar
            </Button>
          ]}
        />
      </Snackbar>
    </div>
  );
}
