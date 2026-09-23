import { useEffect } from "react";
import ogImage from "../assets/og-image.png";
import favicon48 from "../assets/favicon-48.png";
import appleTouch from "../assets/apple-touch-icon.png";

function absoluteUrl(src: string) {
  return new URL(src, window.location.origin).href;
}

function upsertLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  const nodes = [...document.head.querySelectorAll(`link[rel="${rel}"]`)];
  const el = (nodes[0] as HTMLLinkElement | undefined) ?? document.head.appendChild(document.createElement("link"));
  el.rel = rel;
  el.href = href;
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  for (const extra of nodes.slice(1)) extra.setAttribute("href", href);
}

function upsertMeta(kind: "property" | "name", key: string, content: string) {
  let el = document.head.querySelector(`meta[${kind}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(kind, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function BrandHead() {
  useEffect(() => {
    const favicon = absoluteUrl(favicon48);
    const og = absoluteUrl(ogImage);
    upsertLink("icon", favicon, { type: "image/png", sizes: "48x48" });
    upsertLink("apple-touch-icon", absoluteUrl(appleTouch));
    upsertMeta("property", "og:image", og);
    upsertMeta("name", "twitter:image", og);
  }, []);

  return null;
}
