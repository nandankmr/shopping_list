import React, { useState, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import ShoppingList from "./components/ShoppingList";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import { Button } from "@material-ui/core";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState({
    isAuth: false,
    token: "",
    currentUser: {}
  });

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setAuth({ isAuth: false, token: "", currentUser: {} });
  };

  return (
    <div className="app">
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!auth.isAuth ? (
              <Fragment>
                <NavItem className="mr-1 mt-1">
                  <RegisterModal
                    auth={auth}
                    setAuth={setAuth}
                    message={message}
                    setMessage={setMessage}
                  />
                </NavItem>
                {"  "}
                <NavItem className="mr-1 mt-1">
                  <LoginModal
                    setAuth={setAuth}
                    auth={auth}
                    message={message}
                    setMessage={setMessage}
                  />
                </NavItem>
              </Fragment>
            ) : (
              <NavItem className="mr-1 mt-1">
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>

      {auth.isAuth ? (
        <ShoppingList auth={auth} />
      ) : (
        <h1 style={{ textAlign: "center", color: "#333" }}>
          Login or register to add, see or remove Shopping items{" "}
        </h1>
      )}
    </div>
  );
};

export default App;
