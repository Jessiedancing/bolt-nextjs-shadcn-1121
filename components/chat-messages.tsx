"use client";

import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/store";
import { Bot, User } from "lucide-react";

export function ChatMessages() {
  const { chats, currentChat } = useChatStore();
  const chat = chats.find((c) => c.id === currentChat);

  if (!chat) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-gray-500">
        <div>
          <p className="mb-2 text-lg font-medium">Welcome to Chat Assistant</p>
          <p className="text-sm">Select an existing chat or create a new one to get started</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100dvh-8.5rem)]">
      <div className="space-y-4 p-4">
        {chat.messages.map((message) => (
          <article
            key={message.id}
            className="flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <Avatar className="h-8 w-8 shrink-0">
              {message.role === "assistant" ? (
                <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold">
                {message.role === "assistant" ? "Assistant" : "You"}
              </div>
              <div className="mt-1 break-words text-gray-700 dark:text-gray-300">
                {message.content}
              </div>
            </div>
          </article>
        ))}
      </div>
    </ScrollArea>
  );
}