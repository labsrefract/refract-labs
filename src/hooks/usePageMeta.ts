import { useEffect } from "react";
import { site } from "../content/site";

export function usePageMeta(title: string, description: string, path = "/") {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    const url = `${site.url}${path === "/" ? "" : path}`;

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
    const ogUrl = setMeta('meta[property="og:url"]', "content", url);
    const ogImage = setMeta('meta[property="og:image"]', "content", site.ogImage);
    const ogType = setMeta('meta[property="og:type"]', "content", "website");
    const ogSite = setMeta('meta[property="og:site_name"]', "content", site.name);
    const twCard = setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    const twTitle = setMeta('meta[name="twitter:title"]', "content", title);
    const twDesc = setMeta('meta[name="twitter:description"]', "content", description);
    const twImage = setMeta('meta[name="twitter:image"]', "content", site.ogImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    return () => {
      document.title = previousTitle;
      desc.setAttribute("content", description);
      ogTitle.setAttribute("content", previousTitle);
      ogDesc.setAttribute("content", description);
      ogUrl.setAttribute("content", site.url);
      ogImage.setAttribute("content", site.ogImage);
      ogType.setAttribute("content", "website");
      ogSite.setAttribute("content", site.name);
      twCard.setAttribute("content", "summary_large_image");
      twTitle.setAttribute("content", previousTitle);
      twDesc.setAttribute("content", description);
      twImage.setAttribute("content", site.ogImage);
    };
  }, [title, description, path]);
}
