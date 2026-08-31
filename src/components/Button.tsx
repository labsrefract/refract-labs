import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "ghost";

const cls = (variant: Variant, className = "") =>
  `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`.trim();

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cls(variant, className)} {...props} />;
}

export function ButtonLink({
  to,
  variant = "primary",
  className = "",
  children,
  onClick,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link to={to} className={cls(variant, className)} onClick={onClick}>
      {children}
    </Link>
  );
}
