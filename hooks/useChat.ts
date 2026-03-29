/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { generateChatResponse } from "@/lib/gemini";

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  isTyping?: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "model",
      text: "Hello! I'm GokulGPT. How can I help you today? I can tell you about Gokul's skills, show his projects, or help you build your own project! . You have only 3 wishes though, so choose wisely! 😉",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load question count from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('gokulgpt-question-count');
    if (stored) {
      setQuestionCount(parseInt(stored, 10));
    }
  }, []);

  // Save question count to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('gokulgpt-question-count', questionCount.toString());
  }, [questionCount]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || isTyping || questionCount >= 3) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setQuestionCount(prev => prev + 1);

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const history = messages.slice(-3).map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const responseText = await generateChatResponse(text, history);

    setIsLoading(false);

    // Simulate typing effect
    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "model",
      text: "",
      isTyping: true,
    };

    setMessages((prev) => [...prev, modelMessage]);

    let currentText = "";
    const words = responseText.split(" ");

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      setMessages((prev) =>
        prev.map((m) =>
          m.id === modelMessage.id ? { ...m, text: currentText } : m
        )
      );
      // Dynamic delay based on word length for more realism
      const delay = Math.min(150, Math.max(50, words[i].length * 15));
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === modelMessage.id ? { ...m, isTyping: false } : m
      )
    );
    setIsTyping(false);
  }, [messages, isLoading, isTyping, questionCount]);

  return {
    messages,
    sendMessage,
    isLoading,
    isTyping,
    questionCount,
    messagesEndRef,
  };
}