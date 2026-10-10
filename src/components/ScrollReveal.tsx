import { useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealTag = "div" | "section" | "article" | "aside" | "header" | "figure" | "ol" | "li";

export default function ScrollReveal({ as: Tag = "div", children, className = "", delay = 0, style, rise = true, ...rest }: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  rise?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      element.classList.add("is-in");
      observer.disconnect();
    }, { rootMargin: "0px 0px -20% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const Component = Tag as ElementType;
  return <Component ref={ref} className={`${rise ? "ai-rise" : ""} ${className}`.trim()} style={{ ...style, "--col": Math.min(2, delay / 90), "--scroll-delay": `${delay}ms` } as CSSProperties} {...rest}>{children}</Component>;
}