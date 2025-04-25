"use client";
import { ArrowUp, Bot, User } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { useChat } from "@ai-sdk/react";
import { MarkdownRenderer } from "./markdown-renderer";

export default function AiPanel() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, setInput, append } = useChat({
    api: "http://localhost:3001/api/ai/chat",
    credentials: "include",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessages = () => {
    if (input.trim().length === 0) return;
    append({
      content: input,
      role: "user",
    });
    setInput("");
  };

  return (
    <div className="bg-job-card relative col-span-3 flex w-full flex-col rounded-md p-2">
      <header className="absolute top-0 left-0 z-50 flex w-full items-center gap-1 rounded-md rounded-b-none border-b border-neutral-500 bg-neutral-900/50 px-2 py-2 text-sm backdrop-blur-xl">
        <span className="inline-block w-full text-center font-semibold">
          Zentio Ai
        </span>
      </header>
      <section className="flex h-full flex-col items-center justify-center">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center space-y-2 px-4 text-center">
            <div className="translate-y-10 space-y-2">
              <h3 className="text-3xl font-bold">Zentio Assistant</h3>
              <p className="text-sm leading-[1.2] text-balance text-neutral-400">
                Assistant answers questions, refines code, and makes precise
                edits. Ideal for quick iterations, debugging, and hands-on
              </p>
            </div>
          </div>
        ) : (
          <div className="flex max-h-[calc(100dvh-210px)] w-full flex-1 flex-col gap-1 space-y-2 overflow-y-auto p-1 pt-12 pb-4">
            {messages.map((data, index) => {
              return data.role === "assistant" ? (
                <div key={index} className="flex w-full justify-start">
                  <div className="flex max-w-[300px] items-end gap-1">
                    <div className="rounded-sm bg-neutral-600 p-1">
                      <Bot size={14} />
                    </div>
                    <div className="max-w-[320px] rounded bg-neutral-800 px-2 text-sm text-white">
                      <MarkdownRenderer content={data.content} />
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex w-full justify-end">
                  <div className="flex max-w-[300px] items-end gap-1">
                    <div className="rounded bg-neutral-800 px-2 py-1 text-sm text-white">
                      {data.content}
                    </div>
                    <div className="rounded-sm bg-neutral-600 p-1">
                      <User size={14} />
                    </div>
                  </div>
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
