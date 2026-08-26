"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterPhase = "typing" | "holding" | "deleting";

type HeroTypewriterProps = {
  suffix: string;
  words: string[];
};

const typeDelay = 92;
const deleteDelay = 52;
const holdDelay = 1450;
const nextWordDelay = 280;

function splitLetters(word: string) {
  return Array.from(word);
}

export function HeroTypewriter({ suffix, words }: HeroTypewriterProps) {
  const cleanWords = useMemo(() => words.map((word) => word.trim()).filter(Boolean), [words]);
  const firstWord = cleanWords[0] ?? "";
  const suffixText = suffix.trim();
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(splitLetters(firstWord).length);
  const [phase, setPhase] = useState<TypewriterPhase>("holding");
  const currentWord = cleanWords[wordIndex] ?? firstWord;
  const currentLetters = splitLetters(currentWord);
  const visibleWord = currentLetters.slice(0, letterCount).join("");
  const accessibleText = [firstWord, suffixText].filter(Boolean).join(" ");

  useEffect(() => {
    if (!cleanWords.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWordIndex(0);
      setLetterCount(splitLetters(firstWord).length);
      setPhase("holding");
      return;
    }

    let timeoutId: number;

    if (phase === "holding") {
      timeoutId = window.setTimeout(() => setPhase("deleting"), holdDelay);
    } else if (phase === "typing") {
      if (letterCount < currentLetters.length) {
        timeoutId = window.setTimeout(() => setLetterCount((count) => count + 1), typeDelay);
      } else {
        timeoutId = window.setTimeout(() => setPhase("holding"), holdDelay);
      }
    } else if (letterCount > 0) {
      timeoutId = window.setTimeout(() => setLetterCount((count) => count - 1), deleteDelay);
    } else {
      timeoutId = window.setTimeout(() => {
        setWordIndex((index) => (index + 1) % cleanWords.length);
        setPhase("typing");
      }, nextWordDelay);
    }

    return () => window.clearTimeout(timeoutId);
  }, [cleanWords, currentLetters.length, firstWord, letterCount, phase]);

  return (
    <span aria-label={accessibleText} className="heroTypewriter">
      <span aria-hidden="true" className="heroTypewriterWordSlot">
        <span className="heroTypewriterMeasure">
          {cleanWords.map((word) => (
            <span className="heroTypewriterMeasureWord" key={word}>
              {word}
              <span className="heroTypewriterMeasureCursor" />
            </span>
          ))}
        </span>
        <span className="heroTypewriterVisible">
          <span className="heroTypewriterText">{visibleWord}</span>
          <span className="heroTypewriterCursor" />
        </span>
      </span>
      {suffixText ? <span aria-hidden="true" className="heroTypewriterSuffix">{suffixText}</span> : null}
    </span>
  );
}
