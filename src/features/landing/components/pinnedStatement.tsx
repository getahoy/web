"use client";

import { cn } from "cn";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { landingCopy } from "../copy/landingCopy";
import { litWordCount } from "../motion/landingMotion";

const words = landingCopy["statement.text"].split(" ");
const lastIndex = words.length - 1;

export function PinnedStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [lit, setLit] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (progress) =>
    setLit(litWordCount(progress, words.length)),
  );
  useEffect(() => {
    setLit(litWordCount(scrollYProgress.get(), words.length));
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-pin motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh items-center justify-center px-5 sm:px-8 lg:px-12 motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <p className="max-w-note text-balance text-center font-display font-light text-reveal">
          {words.map((word, index) => (
            <span
              key={`${index}-${word}`}
              className={cn(
                "transition-colors duration-240 ease-sheet",
                index < lit ? "text-ink" : "text-fog motion-reduce:text-ink",
                index === lastIndex && "italic",
              )}
            >
              {index === lastIndex ? word : `${word} `}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
