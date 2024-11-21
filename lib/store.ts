import { create } from 'zustand';

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatStore {
  chats: Chat[];
  currentChat: string | null;
  sidebarOpen: boolean;
  addChat: () => void;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id'>) => void;
  toggleSidebar: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  currentChat: null,
  sidebarOpen: true,
  addChat: () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    };
    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChat: newChat.id,
    }));
  },
  deleteChat: (id) => {
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      currentChat: state.currentChat === id ? null : state.currentChat,
    }));
  },
  setCurrentChat: (id) => set({ currentChat: id }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { ...message, id: Date.now().toString() },
              ],
            }
          : chat
      ),
    })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));