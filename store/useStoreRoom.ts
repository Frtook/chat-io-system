import { create } from "zustand";

type UserRoomType = {
  room: string;
  setRoom: (value: string) => void;
};

const useRoom = create<UserRoomType>((set) => ({
  room: "",
  setRoom: (value) => set({ room: value }),
}));
export default useRoom;
