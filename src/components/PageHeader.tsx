import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string | ReactNode;
  subtitle?: string;
}) {
  return (
    <header className="pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Eyebrow text={eyebrow} />
        <h1
          className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold max-w-4xl"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg max-w-2xl" style={{ color: "var(--muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
