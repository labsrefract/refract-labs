import { Link } from "react-router";
import { site } from "../content/site";

export const LOGO_SRC = site.logo;

export function BrandMark({
  className = "",
  alt = "Refract Labs",
  src = LOGO_SRC,
}: {
  className?: string;
  alt?: string;
  src?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      className={className}
      aria-hidden={alt === "" ? true : undefined}
    />
  );
}

export function Logo({ size = "nav" }: { size?: "nav" | "footer" }) {
  const frame =
    size === "footer"
      ? "h-20 w-20 rounded-lg"
      : "h-11 w-11 sm:h-12 sm:w-12 rounded-full";

  return (
    <Link to="/" className="shrink-0 block" aria-label="Refract Labs home">
      <BrandMark className={`${frame} object-cover`} alt="" />
    </Link>
  );
}
