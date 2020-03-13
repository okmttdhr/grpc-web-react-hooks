import React from "react";
import { Messages } from "components/Messages";
import { MessageForm } from "components/MessageForm";
import { GRPCClients } from "gRPCClients";
import { useMessages } from "./hooks/useMessages";
import { useMessageForm } from "./hooks/useMessageForm";

type Props = {
  clients: GRPCClients;
};

export const MessagesContainer: React.FC<Props> = ({ clients }) => {
  const messengerClient = clients.messengerClient;
  const messagesState = useMessages(messengerClient);
  const messageFormState = useMessageForm(messengerClient);
  return (
    <div>
      <MessageForm {...messageFormState} />
      <Messages {...messagesState} />
    </div>
  );
};
