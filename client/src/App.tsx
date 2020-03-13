import React from "react";
import "./App.css";
import { MessengerClient } from "./messenger/MessengerServiceClientPb";
import { MessagesContainer } from "./containers/Messages";

const client = new MessengerClient(`http://localhost:8080`);

export const App = () => {
  return (
    <div className="App">
      <MessagesContainer client={client} />
    </div>
  );
};
