import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      console.log("Auth Check Success:", res.data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error checking authentication:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("successfully signed up!");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error signing up:", error);
      // toast.error("Error signing up. Please try again.");
      // if (error.response && error.response.status === 400) {
      //   toast.error("Email already exists.");
      // } else if (error.response && error.response.status === 500) {
      //   toast.error("Server error. Please try again later.");
      // } else {
      //   toast.error("Network error. Please check your connection.");
      // }

      if (error.response) {
        if (error.response.status === 400) {
          // Check for specific error message from backend if available
          if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message); // Display backend's specific error message
          } else {
            toast.error("Invalid signup data. Please check your inputs."); // Generic 400
          }
        } else if (error.response.status === 409) {
          // Common status for conflict, e.g., email already exists
          toast.error(
            "Email already exists. Please use a different email or sign in."
          );
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          // Catch other client-side errors like 401, 403, 404, etc.
          toast.error(
            `Error: ${error.response.status} - ${
              error.response.statusText || "Something went wrong on the server."
            }`
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        toast.error(
          "Network error. Please check your connection or the server might be down."
        );
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Error setting up request:", error.message);
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");

      get().connectSocket();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      get().disConnectSocket();
    } catch (error) {
      // console.error("Error logging out:", error);
      toast.error(error.response.data.message);
    }
  },

  updateProfilePic: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
