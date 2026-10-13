import { useEffect } from "react"
import { seoForPath, seoSite } from "../content/seo"

export function usePageMeta(title: string, description: string, path = "/") {
  useEffect(() => {
    const page = seoForPath(path)
    const pageTitle = page?.title ?? title
    const pageDescription = page?.description ?? description
    const url = new URL(path, seoSite.url).href
    const image = new URL(
      page && "image" in page && page.image ? page.image : seoSite.image,
      seoSite.url,
    ).href
    document.title = pageTitle
    function meta(kind: "name" | "property", key: string, value: string) {
      let element = document.head.querySelector(`meta[${kind}="${key}"]`)
      if (!element) {
        element = document.createElement("meta")
        element.setAttribute(kind, key)
        document.head.appendChild(element)
      }
      element.setAttribute("content", value)
    }
    for (const [key, value] of Object.entries({
      description: pageDescription,
      robots: path === "/404" ? "noindex, follow" : "index, follow",
      "twitter:card": "summary_large_image",
      "twitter:title": pageTitle,
      "twitter:description": pageDescription,
      "twitter:image": image,
      "twitter:image:alt":
        image === seoSite.image ? seoSite.imageAlt : pageTitle,
    }))
      meta("name", key, value)
    for (const [key, value] of Object.entries({
      "og:title": pageTitle,
      "og:description": pageDescription,
      "og:url": url,
      "og:image": image,
      "og:image:alt": image === seoSite.image ? seoSite.imageAlt : pageTitle,
      "og:type": "website",
      "og:site_name": "Refract Labs",
      "og:locale": "en_KE",
    }))
      meta("property", key, value)
    // Project screenshots vary in dimensions; don't reuse the brand image dimensions.
    document.head
      .querySelectorAll(
        'meta[property="og:image:width"],meta[property="og:image:height"]',
      )
      .forEach((element) => element.remove())
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", url)
    let structured = document.getElementById("page-schema")
    if (!structured) {
      structured = document.createElement("script")
      structured.id = "page-schema"
      structured.setAttribute("type", "application/ld+json")
      document.head.appendChild(structured)
    }
    structured.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url + "#webpage",
      url,
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": seoSite.url + "/#website" },
    })
  }, [title, description, path])
}
