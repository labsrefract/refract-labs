export default function Eyebrow({ text, className = "" }: { text: string; className?: string }) {
  return <p className={["eyebrow", className].filter(Boolean).join(" ")}>{text}</p>;
}
