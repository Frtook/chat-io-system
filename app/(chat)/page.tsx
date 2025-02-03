"use client";
import Joined from "./Joined";
import { useJoined } from "@/store/useStoreJoinded";
import ChatPage from "./ChatPage";

export default function Home() {
  const { joined } = useJoined();

  if (joined) return <ChatPage />;
  if (!joined) return <Joined />;
}
