import { useState } from "react";

function MessageInput({ sendMessage, room }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={`Message #${room}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />

      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;