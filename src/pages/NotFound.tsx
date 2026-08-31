import { ButtonLink } from "../components/Button";
import { BrandMark } from "../components/Logo";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta(
    "Page not found — Refract Labs",
    "That page does not exist. Head back to Refract Labs to keep going.",
  );

  return (
    <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <BrandMark className="h-16 w-16 rounded-md object-cover mb-8" alt="" />
        <p className="eyebrow">404</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold max-w-xl">This page is not on the map.</h1>
        <p className="mt-5 text-lg max-w-lg" style={{ color: "var(--muted)" }}>
          The link may be out of date, or the page may have moved. The studio is still here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/">Back home</ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
