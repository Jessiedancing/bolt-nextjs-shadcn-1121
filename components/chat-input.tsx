"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/lib/store";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export function ChatInput() {
  const [input, setInput] = useState("");
  const { currentChat, addMessage } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentChat) return;

    // Add user message
    addMessage(currentChat, {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    });

    // Simulate AI response
    setTimeout(() => {
      addMessage(currentChat, {
        role: "assistant",
        content: "This is a simulated response. In a real application, this would be connected to an AI service.",
        timestamp: Date.now(),
      });
    }, 1000);

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 z-20 border-t bg-white p-4 dark:bg-gray-950">
      <div className="relative flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[60px] max-h-[200px] resize-none rounded-lg pr-12"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute bottom-2 right-2"
          disabled={!input.trim() || !currentChat}
          aria-label="Send message"
        >
          <SendHorizontal size={18} />
        </Button>
      </div>
    </form>
  );
}