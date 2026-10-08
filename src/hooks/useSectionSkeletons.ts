import { useLayoutEffect, type RefObject } from "react";

const HOLD_MS = 750;
const FADE_MS = 320;

const isClear = (c: string) => !c || c === "transparent" || c === "rgba(0, 0, 0, 0)";

/**
 * Draws a shimmering placeholder of a section's own layout (cards, buttons,
 * text lines), measured from the real content, then swaps the content in.
 */
function buildSkeleton(sec: HTMLElement) {
  const sr = sec.getBoundingClientRect();
  const layer = document.createElement("div");
  layer.className = "ai-sk-layer";
  layer.setAttribute("aria-hidden", "true");

  const add = (r: { left: number; right: number; top: number; width: number; height: number }, radius: string, kind: "box" | "bar") => {
    if (r.width < 3 || r.height < 3 || r.right < sr.left || r.left > sr.right) return;
    const left = Math.max(r.left, sr.left);
    const width = Math.min(r.right, sr.right) - left;
    const d = document.createElement("div");
    d.className = kind === "box" ? "ai-sk-box" : "ai-sk-bar";
    Object.assign(d.style, {
      left: `${left - sr.left}px`,
      top: `${r.top - sr.top}px`,
      width: `${width}px`,
      height: `${r.height}px`,
      borderRadius: radius,
    });
    layer.appendChild(d);
  };

  sec.querySelectorAll<HTMLElement>(".reveal, .reveal > div").forEach((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.height > 90 && r.width > 90 && (!isClear(cs.backgroundColor) || cs.backgroundImage !== "none" || parseFloat(cs.borderTopWidth) > 0)) {
      add(r, cs.borderRadius, "box");
    }
  });

  const buttons = new Set<Element>();
  sec.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.height >= 28 && r.height <= 64 && r.width < 420 && !isClear(cs.backgroundColor)) {
      buttons.add(el);
      add(r, cs.borderRadius, "bar");
    }
  });

  const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node: Node | null;
  let count = 0;
  while ((node = walker.nextNode()) && count < 500) {
    if (!node.textContent?.trim()) continue;
    const parent = node.parentElement;
    if (!parent || parent.closest(".ai-marquee")) continue;
    const button = parent.closest("a, button");
    if (button && buttons.has(button)) continue;
    range.selectNodeContents(node);
    for (const r of Array.from(range.getClientRects())) {
      const h = Math.max(7, Math.min(r.height * 0.58, 44));
      add({ left: r.left, right: r.right, width: r.width, top: r.top + (r.height - h) / 2, height: h }, `${Math.min(6, h / 2)}px`, "bar");
      count++;
    }
  }

  sec.appendChild(layer);
  return layer;
}

/**
 * Each section starts hidden; when it scrolls into view it shows a skeleton
 * for 750ms, then the real content fades in and its reveals rise.
 */
export function useSectionSkeletons(rootRef: RefObject<HTMLElement | null>, enabled = true) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>(":scope > section"));
    const timers: number[] = [];
    root.classList.add("ai-sk");
    sections.forEach((s) => s.classList.add("ai-sk-pending"));

    const activate = (sec: HTMLElement) => {
      const layer = buildSkeleton(sec);
      timers.push(
        window.setTimeout(() => {
          sec.classList.remove("ai-sk-pending");
          sec.classList.add("ai-sk-done");
          layer.classList.add("is-leaving");
          timers.push(window.setTimeout(() => layer.remove(), FADE_MS));
        }, HOLD_MS),
      );
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          activate(entry.target as HTMLElement);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      root.classList.remove("ai-sk");
      sections.forEach((s) => {
        s.classList.remove("ai-sk-pending", "ai-sk-done");
        s.querySelectorAll(".ai-sk-layer").forEach((l) => l.remove());
      });
    };
  }, [rootRef, enabled]);
}
