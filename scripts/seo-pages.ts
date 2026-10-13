import type { Plugin } from "vite"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { organizationData, seoPages, seoSite } from "../src/content/seo"

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
export default function seoPagesPlugin(): Plugin {
  return {
    name: "refract-static-page-metadata",
    apply: "build",
    async writeBundle(options) {
      const directory = path.resolve(options.dir ?? "dist")
      const template = await readFile(
        path.join(directory, "index.html"),
        "utf8",
      )
      for (const page of seoPages) {
        const url = new URL(page.path, seoSite.url).href
        const image = new URL(
          "image" in page && page.image ? page.image : seoSite.image,
          seoSite.url,
        ).href
        let html = template
          .replace(/<title>[\s\S]*?<\/title>/g, "")
          .replace(
            /<meta\b[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,
            "",
          )
          .replace(/<link\b[^>]*rel="canonical"[^>]*>/g, "")
        const names = {
          description: page.description,
          robots: "index, follow",
          "twitter:card": "summary_large_image",
          "twitter:title": page.title,
          "twitter:description": page.description,
          "twitter:image": image,
          "twitter:image:alt":
            image === seoSite.image ? seoSite.imageAlt : page.title,
        }
        const properties = {
          "og:title": page.title,
          "og:description": page.description,
          "og:type": "website",
          "og:url": url,
          "og:site_name": "Refract Labs",
          "og:locale": "en_KE",
          "og:image": image,
          ...(image === seoSite.image
            ? {
                "og:image:width": "1200",
                "og:image:height": "630",
                "og:image:type": "image/jpeg",
              }
            : {}),
          "og:image:alt":
            image === seoSite.image ? seoSite.imageAlt : page.title,
        }
        const schema = JSON.stringify(organizationData).replace(/</g, "\\u003c")
        const pageSchema = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url + "#webpage",
          url,
          name: page.title,
          description: page.description,
          isPartOf: { "@id": seoSite.url + "/#website" },
        }).replace(/</g, "\\u003c")
        const tags = [
          `<title>${escape(page.title)}</title>`,
          `<link rel="canonical" href="${escape(url)}" />`,
          ...Object.entries(names).map(
            ([key, value]) =>
              `<meta name="${key}" content="${escape(value)}" />`,
          ),
          ...Object.entries(properties).map(
            ([key, value]) =>
              `<meta property="${key}" content="${escape(value)}" />`,
          ),
          `<script type="application/ld+json" id="organization-schema">${schema}</script>`,
          `<script type="application/ld+json" id="page-schema">${pageSchema}</script>`,
        ]
        html = html.replace("</head>", tags.join("\n") + "\n</head>")
        const filename =
          page.path === "/" ? "index.html" : `${page.path.slice(1)}/index.html`
        await mkdir(path.dirname(path.join(directory, filename)), {
          recursive: true,
        })
        await writeFile(path.join(directory, filename), html)
      }
      // Generate the sitemap from the same list as the metadata, avoiding missing pages.
      await writeFile(
        path.join(directory, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${seoPages.map((page) => `  <url><loc>${escape(new URL(page.path, seoSite.url).href)}</loc></url>`).join("\n")}\n</urlset>\n`,
      )
    },
  }
}
