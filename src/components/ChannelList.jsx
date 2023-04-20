import React from 'react';
import './ChannelList.css';

function ChannelList({ channels, onJoinChannel}) {

  return (
    <div className="ChannelListContainer">
      <ul className="ChannelList">
        {channels.map((channel) => (
          <div key={channel.id}>
            {channel.name}
            <button className="joinButton" onClick={(e) => { e.stopPropagation(); onJoinChannel(channel); }}>Join Chat</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ChannelList;
