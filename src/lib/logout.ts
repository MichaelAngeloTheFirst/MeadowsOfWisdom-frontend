import {useAuthStore} from "@/app/stores/authStore"
import route from 'next/navigation'
import { getFunFactsUrl } from "./urls";

export function logout() : void {
    console.log("logout");  
    useAuthStore.getState().removeTokens();
    route.redirect("/meadows");
}