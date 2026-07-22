"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Cara buat RFQ?",
  "Estimasi pengiriman?",
  "Apakah ada garansi?",
  "Cara simpan favorit?",
];

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    content,
  };
}

export function AiAssistantPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      "assistant",
      "Halo! Saya Asisten IndustrialX. Tanyakan seputar produk, RFQ, pemesanan, atau layanan kami.",
    ),
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const payload = (await response.json()) as
        | { data: { reply: string } }
        | { error: string };

      if (!response.ok) {
        throw new Error("error" in payload ? payload.error : "Gagal mengirim pesan");
      }

      const successPayload = payload as { data: { reply: string } };
      setMessages((current) => [
        ...current,
        createMessage("assistant", successPayload.data.reply),
      ]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Asisten tidak tersedia");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-border-subtle bg-[#eff6ff] px-4 py-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
          <Bot className="size-5" strokeWidth={2.2} />
        </span>
        <div>
          <h2 className="text-[14px] font-bold text-primary">Asisten IndustrialX</h2>
          <p className="text-[11px] text-on-surface-variant">
            Tanya seputar produk & layanan kami
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed",
                message.role === "user"
                  ? "rounded-br-md bg-primary text-white"
                  : "rounded-bl-md border border-border-subtle bg-[#f8fafc] text-on-surface",
              )}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-border-subtle bg-[#f8fafc] px-3.5 py-2.5 text-[12px] text-on-surface-variant">
              <Loader2 className="size-3.5 animate-spin" />
              Mengetik...
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-border-subtle px-4 py-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void sendMessage(suggestion)}
              disabled={loading}
              className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-[#dbeafe] disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ketik pertanyaan Anda..."
            disabled={loading}
            className="h-11 min-w-0 flex-1 rounded-xl border border-border-subtle bg-white px-3 text-[12px] outline-none placeholder:text-on-surface-variant/70 focus:border-primary"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            aria-label="Kirim pesan"
            className="size-11 shrink-0 rounded-xl"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
