import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data.user });
            get().connectSocket()
        } catch (err) {
            console.log("Auth check error:", err);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            console.log(
                "Successful"
            )
            set({ authUser: res.data.user })
            toast.success("Account created successfully!")
            get().connectSocket()
            return true;
        } catch (err) {
            console.error("Signup error:", err.response?.data);
            toast.error(err.response?.data?.message || "Signup failed")
            return false;
        }
        finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            console.log("Loged in")
            set({ authUser: res.data.user })
            toast.success("Logged in successfully")
            get().connectSocket()
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed")
        }
        finally {
            set({ isLoggingIn: false })
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (err) {
            toast.error(err.response?.data?.message || "Logout failed")
        }
    },
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data.user })
            toast.success("Profile updated successfully")
        } catch (err) {
            console.log("error in update profile", err)
            toast.error(err.response?.data?.message || "Update failed")

        }
    }
    ,
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true,
        });

        socket.connect();

        set({ socket });
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
