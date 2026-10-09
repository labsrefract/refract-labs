import type { CSSProperties } from "react";
import { privacyRecords } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

// Per record: shown raw, scanned line by line, sent to the model, then held.
const STEP_MS = 320;
const PHASES = 12;
const SCAN_FROM = 2;
const SENT_AT = 8;

const maskName = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0] + "•".repeat(w.length - 1))
    .join(" ");
const maskPhone = (phone: string) => phone.slice(0, 6) + phone.slice(6, -3).replace(/\d/g, "•") + phone.slice(-3);
const maskId = (id: string) => "•".repeat(id.length);

/** A raw record passes under a scan line; personal data is masked before it is sent to the model. */
export default function PrivacyScan() {
  const { ref, step, reduced } = useLoop<HTMLDivElement>(STEP_MS);
  const record = privacyRecords[Math.floor(step / PHASES) % privacyRecords.length];
  const phase = reduced ? PHASES - 1 : step % PHASES;

  const fields = [
    { k: "name", raw: record.name, masked: maskName(record.name) },
    { k: "phone", raw: record.phone, masked: maskPhone(record.phone) },
    { k: "id", raw: record.id, masked: maskId(record.id) },
  ];
  // The scan line crosses one field every two steps.
  const scanned = Math.max(0, Math.min(fields.length, Math.floor((phase - SCAN_FROM) / 2) + 1));
  const scanning = phase >= SCAN_FROM && phase < SENT_AT;

  return (
    <div ref={ref} className="live-privacy" aria-hidden="true">
      <div className="live-privacy-record">
        {scanning ? (
          <span className="live-privacy-scan" style={{ "--row": Math.min(scanned, fields.length - 1) } as Vars} />
        ) : null}
        {fields.map((f, i) => {
          const masked = i < scanned;
          return (
            <div key={f.k} className={masked ? "live-privacy-row is-masked" : "live-privacy-row"}>
              <span className="live-privacy-key">{f.k}</span>
              <span key={masked ? "m" : "r"} className="live-privacy-value">
                {masked ? f.masked : f.raw}
              </span>
            </div>
          );
        })}
        <div className="live-privacy-row">
          <span className="live-privacy-key">hosting</span>
          <span className="live-privacy-value ai-accent-text">your cloud</span>
        </div>
      </div>
      <div className={phase >= SENT_AT ? "live-privacy-send is-sent" : "live-privacy-send"}>
        {phase >= SENT_AT ? "Masked record sent to the model ✓" : "Masking personal data…"}
      </div>
    </div>
  );
}
