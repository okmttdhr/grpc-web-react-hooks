import React from "react";

type Props = {
  messages: string[];
};

export const Messages: React.FC<Props> = ({ messages }) => {
  return (
    <div>
      {messages.map(m => (
        <div key={m}>{m}</div>
      ))}
    </div>
  );
};
