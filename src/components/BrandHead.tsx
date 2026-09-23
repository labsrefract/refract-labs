import { useEffect } from "react";
import ogImage from "../assets/og-image.png";

function absoluteUrl(src: string) {
  return new URL(src, window.location.origin).href;
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
    // Keep crawler-facing <link rel="icon"> tags in index.html. Google reads
    // the homepage HTML and ignores hashed Vite icon URLs that change on
    // every deploy.
    const og = absoluteUrl(ogImage);
    upsertMeta("property", "og:image", og);
    upsertMeta("name", "twitter:image", og);
  }, []);

  return null;
}
