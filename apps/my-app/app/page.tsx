"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useSocket } from "./hooks/SocketProvider";

interface Message {
  message: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  const fetchMessages = async () => {
    const response = await axios.get("/getMessages");
    setMessages(response.data.messages);
  }

  useEffect(() => {
    fetchMessages();
  }, [])
  return <div>
    {
      messages.map((m, id) => <div key={id}>{m.message}</div>)
    }
    <button onClick={() => {
      if(!socket) return;
      socket.send("PING");
      socket.onmessage = (e) => {
        setMessages((m) => [...m, {message: e.data}])
      }
    }} className="text-lg px-4 py-2 bg-orange-300 rounded-lg my-4 text-slate-950 cursor-pointer">Click me to receive a pong</button>
  </div>
}

