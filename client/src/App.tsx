import React from "react";
import { MessagesContainer } from "containers/Messages";
import { gRPCClients } from "gRPCClients";

export const App = () => {
  return (
    <>
      <MessagesContainer clients={gRPCClients} />
    </>
  );
};
