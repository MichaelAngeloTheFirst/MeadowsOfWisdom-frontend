import {create } from "zustand";
import privateClient from "@/lib/api";
import { getFunFactsUrl } from "@/lib/urls";

export interface FunFact {
    id: number;
    username: string;
    userId: number;
    countVotes: number;
    userReaction: string | null;
    factText: string;
    createdAt: string;
    updatedAt: string;
  }

type FunfactStore = {
    funfactArray?: FunFact[];
    setFunFact: (funfactArray: FunFact[]) => void;
    fetchFunFacts: () => Promise<void>;
};

export const useFunfactStore = create<FunfactStore>((set) => ({
    setFunFact: (funfactArray) => set({ funfactArray}),
    fetchFunFacts: async () => {
        const { data } = await privateClient.get(getFunFactsUrl());
        set({ funfactArray: data });
    }

}));


