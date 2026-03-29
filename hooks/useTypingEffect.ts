"use client";

import { useEffect, useState } from "react";

type Options = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseBeforeNext?: number;
  loop?: boolean;
  disabled?: boolean;
};

export function useTypingEffect(phrases: string[], options: Options = {}) {
  const {
    typingSpeed = 42,
    deletingSpeed = 28,
    pauseAfterType = 2200,
    pauseBeforeNext = 500,
    loop = true,
    disabled = false,
  } = options;

  const [text, setText] = useState("");

  useEffect(() => {
    if (disabled || phrases.length === 0) {
      const id = setTimeout(() => setText(phrases[0] ?? ""), 0);
      return () => clearTimeout(id);
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let mode: "typing" | "pause" | "deleting" = "typing";
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const clear = () => {
      if (timeoutId) clearTimeout(timeoutId);
    };

    const run = () => {
      const phrase = phrases[phraseIndex] ?? "";

      if (mode === "typing") {
        if (charIndex < phrase.length) {
          charIndex += 1;
          setText(phrase.slice(0, charIndex));
          timeoutId = setTimeout(run, typingSpeed);
        } else {
          mode = "pause";
          timeoutId = setTimeout(() => {
            mode = "deleting";
            run();
          }, pauseAfterType);
        }
        return;
      }

      if (mode === "deleting") {
        if (charIndex > 0) {
          charIndex -= 1;
          setText(phrase.slice(0, charIndex));
          timeoutId = setTimeout(run, deletingSpeed);
        } else {
          const isLast = phraseIndex >= phrases.length - 1;
          if (isLast && !loop) {
            setText(phrases[phraseIndex] ?? "");
            return;
          }
          phraseIndex = loop ? (phraseIndex + 1) % phrases.length : Math.min(phraseIndex + 1, phrases.length - 1);
          mode = "typing";
          timeoutId = setTimeout(run, pauseBeforeNext);
        }
      }
    };

    const boot = setTimeout(() => {
      run();
    }, 500);

    return () => {
      clearTimeout(boot);
      clear();
    };
  }, [phrases, typingSpeed, deletingSpeed, pauseAfterType, pauseBeforeNext, loop, disabled]);

  return text;
}
