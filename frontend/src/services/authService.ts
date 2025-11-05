import api from "@/lib/axios";

export const authService = {
    signUp : async (username: string, password: string, email: string, firstName: string, lastName: string) => {
        const response = await api.post("/auth/signup", {
            username,
            password,
            email,
            firstName,
            lastName
        }, {withCredentials: true});
        return response.data;
    }
}