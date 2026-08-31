import { useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealTag = "div" | "section" | "article" | "aside" | "header" | "figure" | "ol" | "li";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  style,
  ...rest
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-revealed");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    const timeout = window.setTimeout(show, 1600);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          window.clearTimeout(timeout);
          show();
          io.disconnect();
          break;
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => {
      window.clearTimeout(timeout);
      io.disconnect();
    };
  }, []);

  const Comp = Tag as ElementType;

  return (
    <Comp
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--reveal-delay"]: `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Comp>
  );
}
