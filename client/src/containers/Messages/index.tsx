import React from "react";
import { MessengerClient } from "messenger/MessengerServiceClientPb";
import { Messages } from "components/Messages";
import { useMessages } from "./hooks/useMessages";
import { useMessageForm } from "./hooks/useMessageForm";
import { MessageForm } from "components/MessageForm";

type Props = {
  client: MessengerClient;
};

export const MessagesContainer: React.FC<Props> = ({ client }) => {
  const { messages } = useMessages(client);
  const messageFormState = useMessageForm(client);
  return (
    <div>
      <MessageForm {...messageFormState} />
      <Messages messages={messages} />
    </div>
  );
};
