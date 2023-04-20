import { useState } from "react";
import axios from "axios";

export default function MessageForm({ user, channel }) {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;

    const data = {
      SenderId: user.sub,
      Text: message,
      ChannelId: channel.id,
    };

    await axios.post(`/api/Messages`, data);

    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button type="submit">Send</button>
    </form>
  );
}