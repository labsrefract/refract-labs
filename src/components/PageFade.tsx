import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";

export default function PageFade() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isFirst.current) {
      isFirst.current = false;
      if (pathname === "/") return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.remove("page-enter");
    void el.offsetWidth;
    el.classList.add("page-enter");
  }, [pathname]);

  return (
    <div ref={ref}>
      <Outlet />
    </div>
  );
}
