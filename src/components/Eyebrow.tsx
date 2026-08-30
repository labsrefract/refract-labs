export default function Eyebrow({ text }: { text: string }) {
  return (
    <p className="text-xs font-mono font-medium uppercase tracking-widest mb-4"
      style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
      {text}
    </p>
  );
}
