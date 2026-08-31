import { Link } from "react-router";

export const LOGO_SRC = "/logo.jpg";

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
      : "h-12 w-12 sm:h-14 sm:w-14 rounded-md";

  return (
    <Link to="/" className="shrink-0 block" aria-label="Refract Labs home">
      <BrandMark className={`${frame} object-cover`} />
    </Link>
  );
}
