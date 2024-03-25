"use client";
import { useMemo, useState } from "react";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]); // {user: "user1", content: "abc"}

  const sendMessage = async () => {
    const response = await fetch(
      "http://localhost:5005/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender: "test_sender", message: message }),
      }
    );

    const data = await response.json();
    const bot_responses = data.map((response) => {
      return { ...response, user: "bot" };
    });

    setHistory([...history, { user: "me", text: message }, ...bot_responses]);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      {history.map((msg, index) => (
        <div
          key={msg + index}
          style={{ color: msg.user == "me" ? "blue" : "red" }}
        >
          <span>{msg.user + ": "}</span>

          {Object.hasOwn(msg, "image") ? (
            <img src={msg.image} />
          ) : (
            <span>{msg.text}</span>
          )}
        </div>
      ))}
      <div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
