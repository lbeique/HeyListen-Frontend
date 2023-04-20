import { useState } from "react";
import axios from "axios";

export default function SongForm({ user, channel }) {
  const [song, setSong] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!song.trim()) return;

    console.log(song);
    console.log(channel.id);
    console.log(user.sub);

    const data = {
      userId: user.sub,
      name: song,
      channelId: channel.id,
    };

    await axios.post(`/api/Songs`, data);

    setSong("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        placeholder="Type your song"
      />
      <button type="submit">Send</button>
    </form>
  );
}