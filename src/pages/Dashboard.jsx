import { useEffect, useState } from "react";
import useSignalR from "../signalR/useSignalR";
import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import Channel from "../components/Channel";
import ChannelList from "../components/ChannelList";
import axios from "axios"
import "../App.css"

export default function Dashboard() {

  const { user } = useContext(AuthContext)
  const { connection: chatConnection, isConnected: isChatConnected } = useSignalR("/r/chatHub");
  const { connection: musicConnection, isConnected: isMusicConnected } = useSignalR("/r/musicHub");
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [channelUsers, setChannelUsers] = useState([]);
  const [channelSongs, setChannelSongs] = useState([]);


  useEffect(() => {
    if (!chatConnection) {
      return
    }

    chatConnection.on("ReceiveMessage", (message) => {
      console.log("message from the server", message);
      setChannelMessages((prevMessages) => [...prevMessages, message]);
    });

    chatConnection.on("MessageUpdated", (message) => {
      console.log("message updated", message)
      setChannelMessages((prevMessages) =>
        prevMessages.map((m) => (m.id === message.id ? message : m))
      );
    });

    chatConnection.on("MessageDeleted", (messageId) => {
      console.log("message deleted", messageId)
      setChannelMessages((prevMessages) => prevMessages.filter((m) => m.id !== messageId));
    });

    chatConnection.on("UserJoined", (newUser) => {
      console.log("user joined", newUser)
      setChannelUsers((prevActiveUsers) => [...prevActiveUsers, newUser]);
    });

    chatConnection.on("UserLeft", (leftUserId) => {
      console.log("user left", leftUserId)
      setChannelUsers((prevActiveUsers) => prevActiveUsers.filter((user) => user.id !== leftUserId));
    });

    return () => {
      chatConnection.off("ReceiveMessage")
      chatConnection.off("MessageUpdated")
      chatConnection.off("MessageDeleted")
      chatConnection.off("UserJoined");
      chatConnection.off("UserLeft");
    }
  }, [chatConnection])

  useEffect(() => {
    if (!musicConnection) {
      return
    }

    musicConnection.on("ReceiveSong", (song) => {
      console.log("song from the server", song);
      setChannelSongs((prevSongs) => [...prevSongs, song]);
    });

    musicConnection.on("SongUpdated", (song) => {
      console.log("song updated", song)
      setChannelSongs((prevSongs) =>
        prevSongs.map((s) => (s.id === song.id ? song : s))
      );
    });

    musicConnection.on("SongDeleted", (songId) => {
      console.log("song deleted", songId)
      setChannelSongs((prevSongs) => prevSongs.filter((s) => s.id !== songId));
    });

    return () => {
      musicConnection.off("ReceiveSong")
      musicConnection.off("SongUpdated")
      musicConnection.off("SongDeleted")
    }
  }, [musicConnection])


  useEffect(() => {
    async function fetchChannels() {
      const response = await axios.get("api/Channels");
      setChannels(response.data);
    }
    async function fetchUserChannels() {
      const response = await axios.get(`api/Channels/Users/${user.sub}`);
      if (response.data.length > 0) {
        handleRejoinChannel(response.data[0]);
      }
    }
    if (user) {
      fetchUserChannels();
    }
    fetchChannels();
  }, [isChatConnected]);

  async function handleJoinChannel(channel) {
    if (chatConnection) {
      const response = await axios.get(`api/Channels/${channel.id}`);
      setChannelUsers(response.data.users);
      setChannelMessages(response.data.messages);
      setChannelSongs(response.data.songs);
      await chatConnection.invoke("AddToGroup", channel.id);
      await musicConnection.invoke("AddToGroup", channel.id);
      await axios.post(`api/Channels/${channel.id}/Users`, user);
      setSelectedChannel(channel);
    }
  }

  async function handleRejoinChannel(channel) {
    const response = await axios.get(`api/Channels/${channel.id}`);
    setChannelUsers(response.data.users);
    setChannelMessages(response.data.messages);
    setChannelSongs(response.data.songs);
    await chatConnection.invoke("AddToGroup", channel.id);
    await musicConnection.invoke("AddToGroup", channel.id);
    setSelectedChannel(channel);
  }

  async function handleLeaveChannel(channel) {
    if (chatConnection) {
      await chatConnection.invoke("RemoveFromGroup", channel.id);
      await musicConnection.invoke("RemoveFromGroup", channel.id);
      await axios.delete(`api/Channels/${channel.id}/Users/${user.sub}`);
      setSelectedChannel(null);
    }
  }

  async function handleEditMessage(message) {
    await axios.put(`api/Messages/${message.id}`, message);
  }

  async function handleDeleteMessage(message) {
    await axios.delete(`api/Messages/${message.id}`);
  }

  async function handleDeleteSong(song) {
    await axios.delete(`api/Songs/${song.id}`);
  }


  return (
    <div className="Dashboard">
      <div className="Header">
        {!selectedChannel && <h1>Channels</h1>}
        {selectedChannel && <h1>{selectedChannel.name}</h1>}
      </div>
      <div className="Main">
        {user && selectedChannel && (
          <div className="Channel">
            <Channel
              channel={selectedChannel}
              messages={channelMessages}
              users={channelUsers}
              songs={channelSongs}
              user={user}
              onEditMessage={handleEditMessage}
              onDeleteMessage={handleDeleteMessage}
              onLeaveChannel={handleLeaveChannel}
              onDeleteSong={handleDeleteSong}
            />
          </div>
        )}
        {user && !selectedChannel && (
          <div className="Channels">
            <ChannelList channels={channels} onJoinChannel={handleJoinChannel} />
          </div>
        )}
      </div>
    </div>
  );
}
