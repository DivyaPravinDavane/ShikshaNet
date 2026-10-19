"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Sparkles, Send, Bot, ArrowRight, Loader2 } from "lucide-react";
import { useAppStore } from "@/store";
import chatAnswersData from "@/data/chatAnswers.json";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text?: string;
  summary?: string;
  bullets?: string[];
  table?: any[];
  recommendation?: string;
  followUps?: string[];
}

export function ChatDrawer() {
  const { chatOpen, setChatOpen, activeChatQuestion } = useAppStore();
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      sender: "bot",
      summary: "Namaste Secretary Sharma. I am ShikshaNet AI, connected directly to real-time school infrastructure and procurement data streams.",
      bullets: [
        "Ask me about delayed projects, vendor performance, or financial reconciliation.",
        "Select any suggested prompt below to generate instant executive briefings.",
      ],
      followUps: [
        "What should I review today?",
        "Show delayed schools in Rewa",
        "Which vendors are underperforming?",
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // When activeChatQuestion is triggered from outside
  useEffect(() => {
    if (activeChatQuestion) {
      handleSendPrompt(activeChatQuestion);
    }
  }, [activeChatQuestion]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendPrompt = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: questionText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Look up canned answer or fallback
    const matched = (chatAnswersData as Record<string, any>)[questionText] || {
      summary: `I've analyzed the state databases for "${questionText}". Key indicators show 74% physical completion statewide with 287 active delayed projects.`,
      bullets: [
        "Reviewing telemetry across 8,420 institutions.",
        "Audit trail confirms compliance with NEP 2020 and PFMS norms.",
      ],
      recommendation: "Would you like me to generate a formal review note or drill down into a specific district?",
      followUps: ["What should I review today?", "Show delayed schools in Rewa"],
    };

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: "bot",
          summary: matched.summary,
          bullets: matched.bullets,
          table: matched.table,
          recommendation: matched.recommendation,
          followUps: matched.followUps,
        },
      ]);
    }, 600);
  };

  if (!chatOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setChatOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-[#0A1128] border-l border-primary/30 z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="h-[72px] px-6 border-b border-border/60 flex items-center justify-between bg-[#0F1B3D]/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-primaryGlow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                ShikshaNet AI Assistant
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-text-muted">
                Trained on MP Education Department Data
              </p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-3 text-xs leading-relaxed",
                m.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.sender === "bot" && (
                <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={cn(
                  "p-3.5 rounded-2xl max-w-[85%] space-y-2.5",
                  m.sender === "user"
                    ? "bg-primary text-white rounded-tr-none shadow-md font-medium"
                    : "bg-[#0F1B3D] border border-border/80 text-white rounded-tl-none shadow-sm"
                )}
              >
                {m.text && <p>{m.text}</p>}

                {m.summary && (
                  <p className="font-medium text-white/95 whitespace-pre-line">
                    {m.summary}
                  </p>
                )}

                {m.bullets && (
                  <ul className="space-y-1.5 list-disc list-inside text-text-muted pl-1">
                    {m.bullets.map((b, i) => (
                      <li key={i} className="text-white/80" dangerouslySetInnerHTML={{ __html: b }} />
                    ))}
                  </ul>
                )}

                {m.table && (
                  <div className="overflow-x-auto rounded-lg border border-border/60 bg-[#0A1128]/70 mt-2">
                    <table className="w-full text-[11px]">
                      <thead className="text-text-muted border-b border-border/60 text-left bg-white/5">
                        <tr>
                          {Object.keys(m.table[0]).map((k) => (
                            <th key={k} className="p-1.5 capitalize font-semibold">
                              {k}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {m.table.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/5">
                            {Object.values(row).map((val: any, cidx) => (
                              <td key={cidx} className="p-1.5 tabular-nums text-white/90">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {m.recommendation && (
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/25 text-[11px] text-primary-200 text-sky-200">
                    💡 {m.recommendation}
                  </div>
                )}

                {m.followUps && (
                  <div className="pt-1.5 space-y-1 border-t border-border/40">
                    <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider">
                      Suggested Next Questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.followUps.map((f, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendPrompt(f)}
                          className="px-2 py-1 rounded-full bg-white/5 hover:bg-primary/20 border border-border hover:border-primary/40 text-[10px] text-primary transition-all text-left flex items-center gap-1"
                        >
                          {f}
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === "user" && (
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 mt-0.5 font-bold text-xs">
                  RS
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-text-muted">
              <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="italic">ShikshaNet AI is synthesizing data...</span>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-border/60 bg-[#0F1B3D]/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputVal);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about schools, funds, or vendors..."
              className="flex-1 bg-[#0A1128] border border-primary/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/80 disabled:opacity-40 transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
