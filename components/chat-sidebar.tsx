"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store";
import { MessageSquarePlus, Trash2, X } from "lucide-react";

export function ChatSidebar() {
  const { chats, currentChat, sidebarOpen, addChat, deleteChat, setCurrentChat, toggleSidebar } = useChatStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      <nav
        className={cn(
          "fixed left-0 top-0 z-40 h-[100dvh] w-72 transform bg-gray-50 shadow-lg transition-transform duration-200 ease-in-out dark:bg-gray-900",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            onClick={addChat}
          >
            <MessageSquarePlus size={20} />
            <span>New Chat</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100dvh-3.5rem)] px-4">
          <nav className="space-y-2 py-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  chat.id === currentChat && "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <button
                  className="flex-1 truncate text-left"
                  onClick={() => {
                    setCurrentChat(chat.id);
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  {chat.title}
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden group-hover:flex"
                      aria-label="Delete chat"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete chat</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this chat? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteChat(chat.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </nav>
    </>
  );
}