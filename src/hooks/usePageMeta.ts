import { useEffect } from "react";

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    function setMeta(selector: string, attr: string, value: string) {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes("property=")) {
          el.setAttribute("property", selector.match(/property="([^"]+)"/)![1]);
        } else {
          el.setAttribute("name", selector.match(/name="([^"]+)"/)![1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    }

    const desc = setMeta('meta[name="description"]', "content", description);
    const ogTitle = setMeta('meta[property="og:title"]', "content", title);
    const ogDesc = setMeta('meta[property="og:description"]', "content", description);

    return () => {
      document.title = previousTitle;
      desc.setAttribute("content", desc.getAttribute("content") || "");
      ogTitle.setAttribute("content", previousTitle);
      ogDesc.setAttribute("content", description);
    };
  }, [title, description]);
}
