import React from "react";
import { Messages } from "components/Messages";
import { useMessages } from "./hooks/useMessages";
import { useMessageForm } from "./hooks/useMessageForm";
import { MessageForm } from "components/MessageForm";
import { GRPCClients } from "gRPCClients";

type Props = {
  clients: GRPCClients;
};

export const MessagesContainer: React.FC<Props> = ({ clients }) => {
  const messengerClient = clients.messengerClient;
  const { messages } = useMessages(messengerClient);
  const messageFormState = useMessageForm(messengerClient);
  return (
    <div>
      <MessageForm {...messageFormState} />
      <Messages messages={messages} />
    </div>
  );
};
