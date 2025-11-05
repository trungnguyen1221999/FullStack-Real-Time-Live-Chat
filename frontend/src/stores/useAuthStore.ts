import {create } from "zustand";
import {toast} from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";


export const useAuthStore = create<AuthState>((set, get)=>( {

    accessToken: null,
    user: null,
    loading: false,

    signUp : async (username, password, email, firstName, lastName)=>{
        try{
            set({loading:true})
            //call api
            await authService.signUp(username, password, email, firstName, lastName)
            toast.success("Signup successful! Please sign in.")
        }
        catch (error){
            console.log(error)
            toast.error("Signup failed. Please try again.")
        }
        finally {
            set({loading:false})
        }
    }
}))