import React, { useEffect } from "react";
import { MessageRequest } from "../../messenger/messenger_pb";
import { MessengerClient } from "../../messenger/MessengerServiceClientPb";
import { useMessages } from "./hooks";

type Props = {
  client: MessengerClient;
};

export const MessagesContainer: React.FC<Props> = ({ client }) => {
  const { messages } = useMessages(client);

  useEffect(() => {
    const req = new MessageRequest();
    req.setMessage("message from client");
    client.createMessage(req, null, a => {
      console.log(a);
    });
  }, [client]);

  return (
    <div>
      {messages.map(m => (
        <div key={m}>{m}</div>
      ))}
    </div>
  );
};
