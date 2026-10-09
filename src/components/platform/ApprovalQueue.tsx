import { approvalLimit, approvalQueue, approver } from "../../content/ai";
import { useLoop } from "../../hooks/useLoop";

type Phase = "checking" | "auto" | "waiting" | "pressing" | "approved";

const STEP_MS = 650;
// Under the limit an action is checked, then goes through. Over it, the agent
// waits for a person, who presses Approve.
const AUTO: Phase[] = ["checking", "auto", "auto"];
const NEEDS_PERSON: Phase[] = ["checking", "waiting", "waiting", "waiting", "pressing", "approved", "approved"];
const phasesFor = (amount: number) => (amount > approvalLimit ? NEEDS_PERSON : AUTO);
const cycle = approvalQueue.reduce((n, a) => n + phasesFor(a.amount).length, 0);

const kes = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

/** Where step `t` falls in the queue: which action, how far through, and how many came before. */
function locate(t: number) {
  const round = Math.floor(t / cycle);
  let left = t % cycle;
  for (let i = 0; i < approvalQueue.length; i++) {
    const phases = phasesFor(approvalQueue[i].amount);
    if (left < phases.length) return { index: i, phase: phases[left], seq: round * approvalQueue.length + i };
    left -= phases.length;
  }
  return { index: 0, phase: AUTO[0], seq: 0 };
}

function doneLabel(amount: number) {
  return amount > approvalLimit ? `Approved by ${approver}` : "Auto-approved";
}

/** A queue of refunds: small ones pass on their own, a large one waits for a person to approve. */
export default function ApprovalQueue() {
  const { ref, step, reduced } = useLoop<HTMLDivElement>(STEP_MS);
  // Reduced motion: hold on the large refund waiting for approval.
  const bigAt = approvalQueue.slice(0, approvalQueue.findIndex((a) => a.amount > approvalLimit)).reduce((n, a) => n + phasesFor(a.amount).length, 0);
  const { index, phase, seq } = locate(reduced ? bigAt + 2 : step);
  const current = approvalQueue[index];
  const history = [2, 1]
    .map((back) => seq - back)
    .map((s) => ({ s, action: approvalQueue[((s % approvalQueue.length) + approvalQueue.length) % approvalQueue.length] }));

  const asking = phase === "waiting" || phase === "pressing";

  return (
    <div ref={ref} className="live-approvals" aria-hidden="true">
      <span className="live-approvals-limit">Limit {kes(approvalLimit)} per refund</span>
      {history.map(({ s, action }) => (
        <div key={s} className="live-approval-row is-done">
          <span>{action.what}</span>
          <span className="live-approval-amount">{kes(action.amount)}</span>
          <span className="live-approval-state is-ok">✓ {doneLabel(action.amount)}</span>
        </div>
      ))}
      {asking ? (
        <div key={`${seq}-ask`} className="ai-approval live-approval-ask">
          <span className="ai-approval-head">
            <span>Approval needed</span>
            <span className="live-approval-flag">over limit</span>
          </span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            {current.what} · {kes(current.amount)}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <span className={phase === "pressing" ? "ai-chip-btn is-primary is-pressed" : "ai-chip-btn is-primary"}>Approve</span>
            <span className="ai-chip-btn">Review</span>
          </div>
        </div>
      ) : (
        <div key={seq} className={`live-approval-row is-current ${phase === "checking" ? "" : "is-done"}`.trim()}>
          <span>{current.what}</span>
          <span className="live-approval-amount">{kes(current.amount)}</span>
          <span className={phase === "checking" ? "live-approval-state" : "live-approval-state is-ok"}>
            {phase === "checking" ? "Checking limit…" : `✓ ${doneLabel(current.amount)}`}
          </span>
        </div>
      )}
    </div>
  );
}
