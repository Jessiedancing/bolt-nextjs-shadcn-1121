"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { ChatSidebar } from "@/components/chat-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/lib/store";
import { Menu } from "lucide-react";

export default function Home() {
  const { sidebarOpen, toggleSidebar } = useChatStore();

  return (
    <div className="flex h-[100dvh] bg-white dark:bg-gray-950">
      <ChatSidebar />
      
      <main className={cn(
        "flex w-full flex-1 flex-col transition-all duration-200 ease-in-out",
        sidebarOpen ? "lg:ml-72" : "ml-0"
      )}>
        <header className="sticky top-0 z-20 flex h-14 items-center border-b bg-white/80 px-4 backdrop-blur-sm dark:bg-gray-950/80">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Chat Assistant</h1>
        </header>
        
        <section className="relative flex-1 overflow-hidden">
          <ChatMessages />
        </section>
        
        <ChatInput />
      </main>
    </div>
  );
}