import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const ItemModal = ({ addItem }) => {
  const [modal, setModal] = useState(false);
  const [nameOfItem, setNameOfItem] = useState("");

  const toggle = () => {
    setModal(!modal);
    setNameOfItem("");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "2rem" }}
        onClick={toggle}
      >
        Add Item
      </Button>
      <Dialog open={modal} onClose={toggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={toggle}>
          Add Item
        </DialogTitle>
        <DialogContent dividers>
          {/* {progress ? <LinearProgress /> : null} */}

          <TextField
            value={nameOfItem}
            onChange={e => {
              setNameOfItem(e.target.value);
            }}
            margin="dense"
            label="Item"
            type="email"
            autoFocus
            fullWidth
            onKeyPress={e => {
              if (e.key === "Enter") {
                addItem(nameOfItem);
                toggle();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              addItem(nameOfItem);
              toggle();
            }}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
          <Button onClick={toggle} color="secondary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemModal;
