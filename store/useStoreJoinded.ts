import { create } from "zustand";

type JoinedType = {
  joined: boolean;
  setJoinded: (value: boolean) => void;
};

export const useJoined = create<JoinedType>((set) => ({
  joined: false,
  setJoinded: (value: boolean) => set({ joined: value }),
}));
