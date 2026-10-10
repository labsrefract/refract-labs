import { useEffect } from "react";
import { useLocation } from "react-router";
import { AI_PATH } from "../content/ai";

export type Division = "software" | "ai";

const KEY = "refract:division";
/** Company-wide pages that keep the division the visitor came from. */
const SHARED = ["/about", "/contact", "/privacy", "/terms", "/cookies"];

const isUnder = (pathname: string, base: string) => pathname === base || pathname.startsWith(`${base}/`);

function remembered(): Division {
  try {
    return window.sessionStorage.getItem(KEY) === "ai" ? "ai" : "software";
  } catch {
    return "software";
  }
}

/**
 * Which division's navbar to show. /ai is Refract AI; home, services, work and
 * process are Refract Software; shared pages keep the last division visited
 * in this session (a contact link for AI agents counts as AI).
 */
export function useDivision(): Division {
  const { pathname, search } = useLocation();
  const shared = SHARED.some((base) => isUnder(pathname, base));

  let division: Division;
  if (isUnder(pathname, AI_PATH)) division = "ai";
  else if (!shared) division = "software";
  else if (new URLSearchParams(search).get("type") === "ai-agents") division = "ai";
  else division = remembered();

  useEffect(() => {
    if (shared) return;
    try {
      window.sessionStorage.setItem(KEY, division);
    } catch {
      // Storage can be unavailable (private mode); shared pages then default to Software.
    }
  }, [shared, division]);

  return division;
}
