/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, MessageSquare, X, Minus, Maximize2, Mic, MicOff, Shrink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@/hooks/useChat";

const SUGGESTIONS = [
  "Tell me about Gokul",
  "What are his skills?",
  "Show projects",
  "How can you build my project?",
];

export default function GokulGPT() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isAISVisible, setIsAISVisible] = useState(false);
  const { messages, sendMessage, isLoading, isTyping, questionCount, messagesEndRef } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const aiSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setSpeechError(null);
        // Auto-send after a short delay
        setTimeout(() => {
          if (transcript.trim()) {
            sendMessage(transcript);
            setInput("");
          }
        }, 500);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setSpeechError("Microphone access denied. Please check your browser permissions.");
        } else {
          setSpeechError(`Speech error: ${event.error}`);
        }
        setTimeout(() => setSpeechError(null), 3000);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [sendMessage]);

  // Intersection Observer for AI section visibility
  useEffect(() => {
    const aiSection = document.getElementById("ai");
    if (!aiSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAISVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before the section is fully in view
      }
    );

    observer.observe(aiSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput("");
      setSpeechError(null);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setSpeechError("Could not start microphone.");
      }
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || isTyping || questionCount >= 3) return;

    const text = input;
    setInput("");
    await sendMessage(text);

    // Check for specific keywords to scroll
    if (text.toLowerCase().includes("show projects") || text.toLowerCase().includes("work")) {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    } else if (text.toLowerCase().includes("contact")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuggestion = (suggestion: string) => {
    if (questionCount >= 3) return;
    setInput(suggestion);
    inputRef.current?.focus();
    // Auto-send suggestion
    setTimeout(() => {
        sendMessage(suggestion);
        if (suggestion === "Show projects") {
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        } else if (suggestion === "Contact") {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
    }, 100);
  };

  return (
    <>
      {isAISVisible && (
        <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 p-1 shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
          >
            <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-20 blur-lg group-hover:opacity-40" />
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
              <Bot className="h-8 w-8 text-cyan-400 transition-transform group-hover:rotate-12" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
              {questionCount >= 3 ? "!" : 3 - questionCount}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              width: isExpanded ? "min(90vw, 800px)" : "min(90vw, 450px)",
              height: isExpanded ? "min(90vh, 800px)" : "600px"
            }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-xl transition-all duration-300"
          >
            {/* Animated Gradient Border Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-600/10" />
            <div className="absolute -inset-[1px] -z-20 animate-border-glow rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 opacity-30" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">GokulGPT</h3>
                  <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono">Online Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {isExpanded ? <Shrink className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[90%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user" ? "bg-violet-600" : "bg-slate-800 border border-white/10"
                    }`}>
                      {msg.role === "user" ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-cyan-400" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-violet-600 text-white rounded-tr-none"
                        : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none backdrop-blur-sm"
                    }`}>
                      <div className="markdown-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                      {msg.isTyping && (
                        <span className="ml-1 inline-block h-4 w-1 animate-blink bg-cyan-400 align-middle" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-white/10">
                      <Bot className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Question Limit Warning */}
            {questionCount >= 3 && (
              <div className="mx-4 mb-2 rounded-lg bg-amber-500/10 p-2 text-center text-[10px] text-amber-400 border border-amber-500/20">
                You've reached the 3-question limit for this session. Close and reopen the browser to ask more questions.
              </div>
            )}

            {/* Suggestions */}
            {messages.length < 4 && !isLoading && questionCount < 3 && (
              <div className="flex flex-wrap gap-2 p-4 pt-0">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Error Message */}
            {speechError && (
              <div className="mx-4 mb-2 rounded-lg bg-red-500/10 p-2 text-center text-[10px] text-red-400 border border-red-500/20">
                {speechError}
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSend} className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-slate-900/50 text-slate-400 border border-white/10 hover:text-cyan-400"
                  }`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={questionCount >= 3 ? "Question limit reached" : isListening ? "Listening..." : "Ask GokulGPT anything..."}
                  disabled={questionCount >= 3}
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isTyping || questionCount >= 3}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-slate-500">
                Powered by <span className="text-cyan-500/70">Gemini AI</span> • Built by Gokul • Questions: {questionCount}/3
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      )}
    </>
  );
}