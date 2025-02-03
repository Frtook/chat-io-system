import { create } from "zustand";

type UseUserNameType = {
  userName: string;
  setUserName: (value: string) => void;
};

export const useUserName = create<UseUserNameType>((set) => ({
  userName: "",
  setUserName: (value: string) => set({ userName: value }),
}));
