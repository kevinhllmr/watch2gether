
import React, { useEffect } from "react";
import './ChatRoom.css';
import useChat from "../UseChat";
import Axios from "axios";

const ChatRoom = (props) => {
  const { roomId } = localStorage.getItem("roomname"); // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  let [newMessage, setNewMessage] = React.useState(""); // Message to be sent



  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {

    newMessage = localStorage.getItem("username") + ": " + newMessage;
    sendMessage(newMessage);
    Axios.put(`https://gruppe8.toni-barth.com/rooms/` + localStorage.getItem("roomname") + `/chat`, { "user": localStorage.getItem("userID"), "message": String(newMessage) });
    setNewMessage("");
  };

  const handleChatInput = (event) => {

    if (event.key === "k" || "f" || "m" || "ArrowUp" || "ArrowLeft" || "ArrowRight" || "ArrowDown") {
        event.stopPropagation();
    }
    if (event.key === "Enter") {
        handleSendMessage();
    }
  }

  return (
    <div className='chat-container'>
      <div class="chat-message"><p id="chatwelcome"></p></div>
       <div className='chat-box'>
          {messages.map((message) => (
            <p className= 'chat-message'> {message.body}</p>
          ))}
      </div>
     
      <div class="input-container" aria-label='chat input'>
            <input  value={newMessage} type="text" id="chat-input" onChange={handleNewMessageChange} onKeyDown={handleChatInput}/>
            <button id="chat-button" onClick={() => handleSendMessage()} aria-label='send message'></button>
      </div>
      
    </div>
  );
};

export default ChatRoom;