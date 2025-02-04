"use client";
import { clsx } from "clsx";
interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}
export default function ChatMessage({
  sender,
  message,
  isOwnMessage,
}: ChatMessageProps) {
  const isSystemMessage = sender === "system";
  return (
    <div
      className={clsx("flex", {
        "justify-center": isSystemMessage,
        "justify-start": isOwnMessage,
        "justify-end": !isOwnMessage,
      })}
    >
      <div
        className={clsx(` p-4 rounded-2xl`, {
          "rounded-md bg-gray-700 text-white": isSystemMessage,
          "bg-[#00adeb] text-white": isOwnMessage && !isSystemMessage,
          "bg-gray-100 ": !isOwnMessage && !isSystemMessage,
        })}
      >
        {!isSystemMessage && <p className="bg-gray-500">{sender}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
}
