import {create } from "zustand";
import {toast} from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";


export const useAuthStore = create<AuthState>((set, get)=>( {

    accessToken: null,
    user: null,
    loading: false,

    clearState : ()=>{
        set({
            accessToken: null,
            user: null,
            loading: false,
        })
    },

    signUp : async (username, password, email, firstName, lastName)=>{
        try{
            set({loading:true})
            //call api
            await authService.signUp(username, password, email, firstName, lastName)
            toast.success("🎉 Signup successful! Please sign in.")
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
            toast.success("🎉 Signin successful!")
            await get().fetchMe();
        }
        catch (error: any){
            console.log(error)
            toast.error(error?.response?.data?.message || "Signin failed. Please try again.")
            throw error; // ← Throw error để login form biết signin thất bại
        }
        finally {
            set({loading:false})
        }
    },
    signOut : async ()=>{        
   
        try{
            // Gọi API logout trước khi clear state để có accessToken
            await authService.signOut();
            get().clearState();
            toast.success("👋 Signout successful!")
            
        }
        catch (error:any){
            console.log(error)
            // Dù API thất bại vẫn clear state để logout local
            get().clearState();
            toast.error(error?.response?.data?.message || "Signout failed. Please try again.")
        }
    },
    fetchMe : async ()=>{
        try{
           set({loading:true})
           const {user} = await authService.fetchMe();
           set({user});
        }
        catch (error:any){
            console.log(error)
            toast.error(error?.response?.data?.message || "Fetch user info failed. Please try again.")
            set({user:null, accessToken:null});
        }
        finally {
            set({loading:false})
        }
    },
    refresh: async ()=>{
        try{
            set({loading:true})
            const {user, fetchMe} = get();
            const accessToken = await authService.refresh();
            set({accessToken});
            if(!user){
                await fetchMe();
            }
        }
        catch (error:any){
            console.log(error)
            get().clearState();
            toast.error(error?.response?.data?.message || "Session expired. Please sign in again.")
        }
        finally {
            set({loading:false})
        }
    }
}));