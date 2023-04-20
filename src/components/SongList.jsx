import React, { useState } from "react";

function SongList({ songs, user, onEditSong, onDeleteSong }) {

  const [editingSong, setEditingSong] = useState(null);
  const [editedSongName, setEditedSongName] = useState("");

  function startEditingSong(song) {
    setEditingSong(song);
    setEditedSongName(song.name);
  }

  function saveEditedSong() {
    if (editedSongName.trim() !== "") {
      editingSong.name = editedSongName;
      onEditSong(editingSong);
      setEditingSong(null);
      setEditedSongName("");
    }
  }

  return (
    <div className="MessageList">
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.name}</strong>:
            {editingSong && editingSong.id === song.id ? (
              <input
                type="text"
                value={editedSongName}
                onChange={(e) => setEditedSongName(e.target.value)}
              />
            ) : (
              null
            )}
            {song.userId === user.id && (
              <>
                {editingSong && editingSong.id === song.id ? (
                  <>
                    <button onClick={saveEditedSong}>Save</button>
                    <button onClick={() => setEditingSong(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditingSong(song)}>Edit</button>
                    <button onClick={() => onDeleteSong(song)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;