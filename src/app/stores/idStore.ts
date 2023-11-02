import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


type IdStore = {
    id? : number;
    setId: (id: number) => void;
};


export const useIdStore = create<IdStore>()(
    persist(
        (set) => ({
            setId: (id: number) => set({ id }),
        }),
        {
            name: "idStorage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
