import React, { useState } from "react";
import { Alert } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { LinearProgress } from "@material-ui/core";

const RegisterModal = ({ auth, setAuth, message, setMessage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
    setName("");
    setPassword("");
    setEmail("");
    setMessage("");
  };

  const regex = new RegExp(
    "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"
  );
  const handleRegister = () => {
    if (name.trim() && password.trim() && email.trim()) {
      if (regex.test(email.trim())) {
        setProgress(true);
        Axios.post("https://shoppinglistbackend.herokuapp.com/users/register", {
          name,
          email,
          password
        })
          .then(
            res => {
              console.log(res);
              setAuth({
                isAuth: true,
                token: res.data.token,
                currentUser: res.data.user
              });
              toggle();
            },
            err => {
              try {
                if (err.response.data.mes) setMessage(err.response.data.mes);
                console.log(err.response);
              } catch (e) {
                setMessage("Something went very wrong");
              }
            }
          )
          .finally(() => setProgress(false));
      } else setMessage("Enter a valid email id");
    } else setMessage("Enter all fields");
    // toggle();
  };

  return (
    <div>
      <Button color="default" variant="contained" onClick={toggle}>
        Register
      </Button>
      <Dialog open={open} onClose={toggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={toggle}>
          Register
        </DialogTitle>
        <DialogContent dividers>
          {progress ? <LinearProgress /> : null}
          {message ? <Alert color="danger">{message}</Alert> : null}
          <TextField
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
          />
          <TextField
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            margin="dense"
            id="password"
            label="password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegister} color="primary" variant="contained">
            Register
          </Button>
          <Button onClick={toggle} color="secondary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterModal;
