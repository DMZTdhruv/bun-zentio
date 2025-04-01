"use client";
import { ArrowUp, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

export default function AiPanel() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessages = () => {
    if (message.trim().length === 0) return;
    setMessages((prev) => [...prev, message]);
    setMessage(""); // Clear input after sending
  };

  return (
    <div className="bg-job-card relative col-span-3 flex w-full flex-col rounded-md p-2">
      <header className="absolute top-0 left-0 flex w-full items-center gap-1 rounded-md rounded-b-none border-b border-neutral-500 bg-neutral-900/50 px-2 py-2 text-sm backdrop-blur-xl">
        <Plus size={18} />
        <span>New chat</span>
      </header>
      <section className="flex h-full flex-col items-center justify-center">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center space-y-2 px-4 text-center">
            <div className="translate-y-10 space-y-2">
              <h3 className="text-3xl font-bold">Zentio Assistant</h3>
              <p className="text-sm leading-[1.2] text-balance text-neutral-400">
                Assistant answers questions, refines code, and makes precise
                edits. Ideal for quick iterations, debugging, and hands-on
                tasks.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex max-h-[calc(100dvh-210px)] w-full flex-1 flex-col items-start gap-1 overflow-y-auto p-1 pt-12 pb-4">
            {messages.map((value, index) => {
              return (
                <div
                  className="ml-auto w-fit max-w-[300px] rounded-md bg-neutral-800 p-1 px-2 text-left"
                  key={index}
                >
                  {value}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="relative w-full pb-1">
          <Textarea
            placeholder="Write your question"
            className="h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessages();
              }
            }}
          />
          <Button
            size="icon"
            className="absolute right-2 bottom-4"
            onClick={handleSendMessages}
          >
            <ArrowUp />
          </Button>
        </div>
      </section>
    </div>
  );
}
