"use client";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socketClient";
import logo from "@/public/Telegram-logo.webp";
import Image from "next/image";

export default function Home() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [room, setRoom] = useState("");
  const [joinded, setJoinded] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on("user_joined", (message) => {
      setMessages((prev) => [...prev, { sender: "system", message }]);
    });
    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmmitJoin = () => {
    if (userName && room) {
      socket.emit("join-room", { room, username: userName });
      setJoinded(true);
    }
  };
  const handleSendMesage = (message: string) => {
    const data = { room, message, sernder: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };

  return (
    <div>
      {!joinded ? (
        <div className=" p-4 shadow-2xl flex flex-col gap-8 w-[95%] md:w-[40%] mx-auto mt-10 rounded-xl">
          <Image width={200} className="mx-auto" src={logo} alt="Logo " />
          <p className="text-3xl text-center">Welcom to Telegram App</p>
          <form
            className="flex flex-col gap-8 p-2 md:p-8"
            onSubmit={handleSubmmitJoin}
          >
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Username"
              className="bg-gray-100 p-2 rounded-md"
            />
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter Room Number"
              className="bg-gray-100 p-2 rounded-md"
            />
            <input
              type="submit"
              className="px-4 py-2 self-center bg-[#00adeb] text-white rounded-xl"
              value="Join Room"
            />
          </form>
        </div>
      ) : (
        <>
          <h1 className="text-4xl mt-8 font-bold text-center">
            Room <span className=" font-thin text-[#00adeb]">{room}</span>
          </h1>

          <div className="flex w-[95%] md:w-[40%] mx-auto mt-10 rounded-2xl bg-[#ebecf0] flex-col justify-center">
            <div
              ref={messagesEndRef}
              className="h-[420px] w-full flex flex-col gap-5  overflow-y-auto   mx-auto mt-10 "
            >
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  sender={msg.sender}
                  message={msg.message}
                  isOwnMessage={msg.sender === userName}
                />
              ))}
            </div>
            <ChatForm onSendMessage={handleSendMesage} />
          </div>
        </>
      )}
    </div>
  );
}
