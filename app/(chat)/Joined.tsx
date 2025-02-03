import { socket } from "@/lib/socketClient";
import logo from "@/public/Telegram-logo.webp";
import { useJoined } from "@/store/useStoreJoinded";
import useRoom from "@/store/useStoreRoom";
import { useUserName } from "@/store/useStoreUserName";
import Image from "next/image";
export default function Joined() {
  const { room, setRoom } = useRoom();
  const { userName, setUserName } = useUserName();
  const { setJoinded } = useJoined();
  const handleSubmmitJoin = () => {
    if (userName && room) {
      socket.emit("join-room", { room, username: userName });
      setJoinded(true);
    }
  };
  return (
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
  );
}
