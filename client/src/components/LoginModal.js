import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Alert } from "reactstrap";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { LinearProgress } from "@material-ui/core";

const LoginModal = ({ auth, setAuth, message, setMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(false);

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
    setPassword("");
    setEmail("");
    setMessage("");
  };

  const handleLogin = () => {
    setProgress(true);
    Axios.post("https://shoppinglistbackend.herokuapp.com/auth/login", {
      email,
      password
    })
      .then(data => {
        console.log(data);
        setAuth({
          isAuth: true,
          token: data.data.token,
          currentUser: data.data.user
        });
        toggle();
      })
      .catch(err => {
        try {
          if (err.response.data.mes) setMessage(err.response.data.mes);
          console.log(err.response);
        } catch (e) {
          setMessage("Something went very wrong");
        }
      })
      .finally(() => setProgress(false));
    // toggle();
  };

  return (
    <div>
      <Button color="default" variant="contained" onClick={toggle}>
        Login
      </Button>
      <Dialog open={open} onClose={toggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="customized-dialog-title" onClose={toggle}>
          Login
        </DialogTitle>
        <DialogContent dividers>
          {progress ? <LinearProgress /> : null}
          {message ? <Alert color="danger">{message}</Alert> : null}
          <TextField
            autoFocus
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
          <Button onClick={handleLogin} color="primary" variant="contained">
            Login
          </Button>
          <Button onClick={toggle} color="secondary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
