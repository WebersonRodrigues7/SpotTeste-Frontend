import { IEmail } from "@/types/Interfaces";
import { create } from "zustand";

export const useEmail = create<IEmail>((set) => ({
  email: "",
  setEmail: (email: string) =>
    set(() => ({
      email: email,
    })),
}));
