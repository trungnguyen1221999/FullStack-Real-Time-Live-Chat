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
        catch (error:any){
            console.log(error)
            toast.error(error?.response?.data?.message || "Signup failed. Please try again.")
            throw error; // ← Throw error để login form biết signup thất bại

        }
        finally {
            set({loading:false})
        }
    }
    ,
    signIn : async (username, password)=>{
        try{
            set({loading:true})
            const {accessToken} = await authService.signIn(username, password)
            set({accessToken})
            toast.success("Signin successful!")
        }
        catch (error: any){
            console.log(error)
            toast.error(error?.response?.data?.message || "Signin failed. Please try again.")
            throw error; // ← Throw error để login form biết signin thất bại
        }
        finally {
            set({loading:false})
        }
    }
}))