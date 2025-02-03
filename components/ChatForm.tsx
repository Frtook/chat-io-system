"use client";
import Image from "next/image";
import { useState } from "react";
import sendImage from "@/public/paper-plane.png";
export default function ChatForm({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const handleSubmmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmmit}
        className="bg-gray-300 flex gap-5 rounded-2xl"
      >
        <input
          className="bg-transparent flex-1 p-4 focus:outline-none"
          type="text"
          value={message}
          placeholder="Type to write message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Image
          width={50}
          className="p-2"
          src={sendImage}
          alt="send"
          onClick={handleSubmmit}
        />
      </form>
    </div>
  );
}
