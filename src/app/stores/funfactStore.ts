import {create } from "zustand";
import privateClient from "@/lib/api";
import { getFunFactsUrl, getRefreshUrl } from "@/lib/urls";
import {useAuthStore} from "@/app/stores/authStore"
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


const refreshAccessToken = async () => {
    try{
        const refreshToken = useAuthStore.getState().refreshToken;
        const {data} = await privateClient.post(getRefreshUrl(), {refresh : refreshToken});
        
        if(!data.access){
            throw new Error("No data received");
        }
        
        return data.access;
    }
    catch(e){
        console.log(e);
           // console.log(e.response.status);
    }
}

export const useFunfactStore = create<FunfactStore>((set) => ({
    setFunFact: (funfactArray) => set({ funfactArray}),
    fetchFunFacts: async () => {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        if(refreshToken){
            const accessToken = await refreshAccessToken();
            const { data} = await privateClient.get(getFunFactsUrl(),{
                headers: {
                    Authorization: `Bearer ${accessToken.access}`,
                },
            });
            set({ funfactArray: data }); 

        }else{
        const { data } = await privateClient.get(getFunFactsUrl());
        console.log("data",data);
        set({ funfactArray: data });
        }


    }

}));














