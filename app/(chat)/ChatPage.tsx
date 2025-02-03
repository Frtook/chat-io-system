"use client";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { socket } from "@/lib/socketClient";
import useRoom from "@/store/useStoreRoom";
import { useUserName } from "@/store/useStoreUserName";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const { room } = useRoom();
  const { userName } = useUserName();
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
  const handleSendMesage = (message: string) => {
    const data = { room, message, sernder: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };
  return (
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
  );
}
