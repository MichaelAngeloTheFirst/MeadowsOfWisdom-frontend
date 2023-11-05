import {create } from "zustand";

interface FunFact {
    id: number;
    username: string;
    userId: number;
    factText: string;
    createdAt: string;
    updatedAt: string;
  }

type FunfactStore = {
    funfactArray?: FunFact[];
    setFunFact: (funfactArray: FunFact[]) => void;
};

export const useFunfactStore = create<FunfactStore>((set) => ({
    setFunFact: (funfactArray) => set({ funfactArray}),
}));


