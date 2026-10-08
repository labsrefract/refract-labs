import { useEffect, type RefObject } from "react";

const DURATION = 700;
const INTERACTIVE = "a, button, input, textarea, select, [contenteditable]";

/**
 * Wheel and arrow/page keys move one section at a time with an eased scroll.
 * Sections taller than the viewport scroll normally until their edge is reached.
 * Off for reduced motion, and while the mobile menu or a nav menu has the pointer.
 */
export function useSnapScroll(rootRef: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let locked = false;
    let unlockTimer = 0;
    let frame = 0;

    const targets = () => {
      const list = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
      const footer = document.querySelector<HTMLElement>("body footer");
      if (footer) list.push(footer);
      return list;
    };

    function tween(to: number) {
      locked = true;
      const from = window.scrollY;
      const distance = to - from;
      const start = performance.now();
      let done = false;

      const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" });
      const finish = () => {
        if (done) return;
        done = true;
        cancelAnimationFrame(frame);
        jump(to);
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => {
          locked = false;
        }, 120);
      };
      const tick = () => {
        if (done) return;
        const p = Math.min(1, (performance.now() - start) / DURATION);
        jump(from + distance * (1 - Math.pow(1 - p, 3)));
        if (p >= 1) finish();
        else frame = requestAnimationFrame(tick);
      };

      tick();
      window.setTimeout(finish, DURATION + 250);
    }

    function step(dir: 1 | -1, e: Event) {
      const secs = targets();
      if (!secs.length) return;
      const vh = window.innerHeight;

      let i = 0;
      secs.forEach((s, j) => {
        if (s.getBoundingClientRect().top <= vh * 0.35) i = j;
      });
      const r = secs[i].getBoundingClientRect();
      let top: number;

      if (dir > 0) {
        if (r.bottom > vh + 4) return;
        const next = secs[i + 1];
        if (!next) return;
        top = next.getBoundingClientRect().top + window.scrollY;
      } else {
        if (r.top < -4) return;
        const prev = secs[i - 1];
        if (!prev) {
          if (window.scrollY <= 0) return;
          top = 0;
        } else {
          const pr = prev.getBoundingClientRect();
          top = pr.top + window.scrollY + Math.max(0, pr.height - vh);
        }
      }

      e.preventDefault();
      tween(Math.max(0, top));
    }

    const blocked = (target: EventTarget | null) =>
      document.body.style.overflow === "hidden" || (target instanceof Element && !!target.closest(".site-nav"));

    function onWheel(e: WheelEvent) {
      if (e.ctrlKey || Math.abs(e.deltaY) < 4 || blocked(e.target)) return;
      if (locked) {
        e.preventDefault();
        return;
      }
      step(e.deltaY > 0 ? 1 : -1, e);
    }

    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey || blocked(e.target)) return;
      const onControl = e.target instanceof Element && !!e.target.closest(INTERACTIVE);
      const k = e.key;
      let dir: 1 | -1 | 0 = 0;
      if (k === "ArrowDown" || k === "PageDown" || (k === " " && !e.shiftKey && !onControl)) dir = 1;
      else if (k === "ArrowUp" || k === "PageUp" || (k === " " && e.shiftKey && !onControl)) dir = -1;
      if (!dir) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (locked) {
        e.preventDefault();
        return;
      }
      step(dir, e);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
      window.clearTimeout(unlockTimer);
    };
  }, [rootRef, enabled]);
}
