import React, { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import { HubConnectionBuilder } from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44391/hubs/chat")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Conectado");

          connection.on("ReceiveMessage", (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Falló conexión", e));
    }
  }, [connection]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    };
console.log(connection);
    if (connection.connectionStarted) {
      try {
        await connection.send("SendMessage", chatMessage);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("No existe el servidor");
    }
  };

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
