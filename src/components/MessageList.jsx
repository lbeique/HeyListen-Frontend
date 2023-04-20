import React, { useState } from "react";
import "./MessageList.css"

function MessageList({ messages, user, onEditMessage, onDeleteMessage }) {

  const [editingMessage, setEditingMessage] = useState(null);
  const [editedText, setEditedText] = useState("");

  function startEditing(message) {
    setEditingMessage(message);
    setEditedText(message.text);
  }

  function saveEditedMessage() {
    if (editedText.trim() !== "") {
      editingMessage.text = editedText;
      onEditMessage(editingMessage);
      setEditingMessage(null);
      setEditedText("");
    }
  }

  return (
    <div className="MessageList">
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.sender.username}</strong>:&nbsp;
            {editingMessage && editingMessage.id === message.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              message.text
            )}
            {message.senderId === user.sub && (
              <>
                {editingMessage && editingMessage.id === message.id ? (
                  <>
                    <button className="messageButton" onClick={saveEditedMessage}>Save</button>
                    <button className="messageButton" onClick={() => setEditingMessage(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="messageButton" onClick={() => startEditing(message)}>Edit</button>
                    <button className="messageButton" onClick={() => onDeleteMessage(message)}>Delete</button>
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

export default MessageList;