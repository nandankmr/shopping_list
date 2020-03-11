import React, { useState, useEffect } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import Axios from "axios";
import ItemModal from "./ItemModal";

const ShoppingList = ({ auth }) => {
  const [items, setItems] = useState([]);
  const [spinning, setSpinning] = useState(true);
  // const ENDPOINT = "http://localhost:5000";

  const getItems = () => {
    setSpinning(true);
    Axios.get("https://shoppinglistbackend.herokuapp.com/api/items", {
      headers: {
        "x-auth-token": auth.token
      }
    })
      .then(data => {
        setItems(data.data);
        console.log(data.data);
      })
      .catch(err => console.log(err))
      .finally(() => setSpinning(false));
  };

  const addItem = name => {
    if (name) {
      setSpinning(true);
      Axios.post(
        "https://shoppinglistbackend.herokuapp.com/api/items",
        { name },
        {
          headers: {
            "x-auth-token": auth.token
          }
        }
      )
        .then(() => getItems())
        .catch(err => console.log(err))
        .finally(() => setSpinning(false));
    }
  };

  const deleteItem = id => {
    setSpinning(true);
    Axios.delete("https://shoppinglistbackend.herokuapp.com/api/items/" + id, {
      headers: {
        "x-auth-token": auth.token
      }
    })
      .then(() => getItems())
      .catch(err => console.log(err))
      .finally(() => setSpinning(false));
  };

  useEffect(getItems, [1]);

  return (
    <Container>
      <ItemModal addItem={addItem} />
      {spinning ? <LinearProgress /> : null}
      <ListGroup>
        <TransitionGroup>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  color="danger"
                  className="remove-btn"
                  style={{ marginRight: "0.5rem" }}
                  onClick={() => deleteItem(_id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
