import { create } from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
    allContacts: [],
    users: [], // Added users state
    chats: [],
    messages: [],
    unreadCounts: {}, // { userId: count }
    activeTab: "chat",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        const newSoundState = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", newSoundState);
        set({ isSoundEnabled: newSoundState });
    },

    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },

    getUnreadCounts: async () => {
        try {
            const res = await axiosInstance.get("/messages/unread/counts");
            set({ unreadCounts: res.data });
        } catch (error) {
            console.log("Failed to fetch unread counts", error);
        }
    },

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/users");
            set({ users: res.data });
            get().getUnreadCounts();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch contacts");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
            get().getUnreadCounts();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to fetch chats");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });

            // Mark as read immediately when opening chat
            await get().markMessagesAsRead(userId);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    markMessagesAsRead: async (userId) => {
        try {
            await axiosInstance.put(`/messages/mark-read/${userId}`);

            // Update local state: reset count for this user to 0
            set(state => ({
                unreadCounts: {
                    ...state.unreadCounts,
                    [userId]: 0
                }
            }));
        } catch (error) {
            console.log("Failed to mark messages as read", error);
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();
        const optimisticMessage = {
            senderId: authUser._id,
            receiverId: selectedUser._id, // Fixed typo: recieverId -> receiverId
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };

        set({ messages: [...messages, optimisticMessage] });

        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                messageData
            );
            // Replace optimistic message or append real one
            // merging logic simply appends for now, could be improved
            set({ messages: messages.concat(res.data) });
        } catch (err) {
            set({ messages: messages }); // Revert
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser =
                selectedUser?._id === newMessage.senderId;

            if (isMessageSentFromSelectedUser) {
                // Chat is OPEN: Append message
                set({ messages: [...get().messages, newMessage] });
                // Mark as read immediately
                get().markMessagesAsRead(newMessage.senderId);
            } else {
                // Chat is CLOSED: Increment unread count
                set((state) => ({
                    unreadCounts: {
                        ...state.unreadCounts,
                        [newMessage.senderId]: (state.unreadCounts[newMessage.senderId] || 0) + 1
                    }
                }));
                toast(`New message from ${newMessage.senderId}`); // ideally verify sender name
            }

            if (isSoundEnabled) {
                const notificationSound = new Audio("/sounds/notification.mp3");
                notificationSound.currentTime = 0;
                notificationSound
                    .play()
                    .catch((e) => console.log("Audio Failed:", e));
            }
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) socket.off("newMessage");
    },
}));