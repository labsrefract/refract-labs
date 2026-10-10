import { useEffect, useRef, useState } from "react";

/**
 * A step counter for looping card animations. It advances every `ms` while
 * the element behind `ref` is on screen, and pauses when it scrolls away.
 * With reduced motion it never advances, so cards show one still frame.
 */
export function useLoop<T extends Element>(ms: number) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(0);
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let id = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(id);
      if (entry.isIntersecting) id = window.setInterval(() => setStep((s) => s + 1), ms);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [ms, reduced]);

  return { ref, step, reduced };
}
