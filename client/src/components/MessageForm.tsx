import React from "react";
import { useMessageForm } from "containers/Messages/hooks/useMessageForm";

type Props = ReturnType<typeof useMessageForm>;

export const MessageForm: React.FC<Props> = ({
  message,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={message} onChange={onChange} />
    </form>
  );
};
