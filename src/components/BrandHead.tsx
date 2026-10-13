import { useEffect } from "react"
import { organizationData } from "../content/seo"
export default function BrandHead() {
  useEffect(() => {
    let script = document.getElementById("organization-schema")
    if (!script) {
      script = document.createElement("script")
      script.id = "organization-schema"
      script.setAttribute("type", "application/ld+json")
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(organizationData)
  }, [])
  return null
}
