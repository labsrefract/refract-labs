/** Discovery calls are booked in Nairobi time. EAT is UTC+3 with no DST. */
export const CALL_TZ = "Africa/Nairobi";
export const CALL_OFFSET = "+03:00";
export const CALL_MINUTES = 30;
export const SLOT_HOURS = [9, 10, 11, 12, 14, 15, 16] as const;
export const BUSINESS_DAYS = 12;
const LEAD_MS = 60 * 60 * 1000;

export type CallDay = {
  ymd: string;
  label: string;
};

export type CallTime = {
  hour: number;
  iso: string;
  label: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function slotIso(ymd: string, hour: number) {
  return `${ymd}T${pad(hour)}:00:00${CALL_OFFSET}`;
}

function nairobiYmd(d: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CALL_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function atNairobiNoon(ymd: string) {
  return new Date(`${ymd}T12:00:00${CALL_OFFSET}`);
}

function addDays(ymd: string, n: number) {
  const d = atNairobiNoon(ymd);
  d.setUTCDate(d.getUTCDate() + n);
  return nairobiYmd(d);
}

function isWeekday(ymd: string) {
  const wd = atNairobiNoon(ymd).getUTCDay();
  return wd !== 0 && wd !== 6;
}

export function listCallTimes(ymd: string, now = new Date()): CallTime[] {
  if (!isWeekday(ymd)) return [];
  return SLOT_HOURS.map((hour) => ({
    hour,
    iso: slotIso(ymd, hour),
    label: `${pad(hour)}:00`,
  })).filter((slot) => new Date(slot.iso).getTime() > now.getTime() + LEAD_MS);
}

export function listCallDays(now = new Date()): CallDay[] {
  let ymd = nairobiYmd(now);
  const days: CallDay[] = [];
  for (let i = 0; i < 28 && days.length < BUSINESS_DAYS; i += 1) {
    if (listCallTimes(ymd, now).length) {
      days.push({
        ymd,
        label: new Intl.DateTimeFormat("en-GB", {
          timeZone: CALL_TZ,
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(atNairobiNoon(ymd)),
      });
    }
    ymd = addDays(ymd, 1);
  }
  return days;
}

export function formatCallSlot(iso: string) {
  const d = new Date(iso);
  const when = new Intl.DateTimeFormat("en-GB", {
    timeZone: CALL_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(d);
  return `${when} EAT`;
}

export function isValidCallSlot(iso: string, now = new Date()) {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):00:00\+03:00$/.exec(iso);
  if (!match) return false;
  const ymd = match[1];
  const hour = Number(match[2]);
  return listCallTimes(ymd, now).some((slot) => slot.hour === hour);
}
