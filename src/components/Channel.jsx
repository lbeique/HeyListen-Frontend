import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ActiveUsers from "./ActiveUsers";
import MessageForm from "./MessageForm";
import SongForm from "./SongForm";
import "./Channel.css";

export default function Channel({ user, users, songs, channel, messages, onLeaveChannel, onEditMessage, onDeleteMessage, onDeleteSong }) {

  function handleLeaveChannel() {
    onLeaveChannel(channel);
  }

  console.log("Channel.jsx: ", songs)
  console.log("Channel.jsx: ", user.sub)

  return (
    <div className="Channel">
      <div className="mainContainer">
        <div className="leftContainer">
          <div className="videoContainer">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/8Qn_spdM5Zg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div className="queueSuggestionsContainer">
            <div className="queueContainer">
              <h3>Queue</h3>
              {/* I want to map through the songs that are passed in the prop. Each song has a name. */}
              <ul>
                {songs.map((song) => (
                  <li key={song.id}>
                    {song.name}
                    {song.userId === user.sub && (
                      <span
                        className="song-delete"
                        onClick={() => onDeleteSong(song)}
                      >
                        X
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="suggestionsContainer">
              <h3>Suggestions</h3>
              <ul>
                <li>1. Song Name</li>
                <li>2. Song Name</li>
                <li>3. Song Name</li>
              </ul>
            </div>
          </div>
          <SongForm user={user} channel={channel} />
        </div>
        <div className="rightContainer">
          <MessageList
            messages={messages}
            user={user}
            onEditMessage={onEditMessage}
            onDeleteMessage={onDeleteMessage}
          />
          <MessageForm user={user} channel={channel} />
        </div>
        <div className="farRightContainer">
          <ActiveUsers users={users} />
        </div>
      </div>
      <button onClick={handleLeaveChannel}>Leave channel</button>
    </div>
  );
}