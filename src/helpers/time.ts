export const DAY_MS = 86_400_000;

// Days elapsed since a stored timestamp. Accepts a millisecond number (new format) or an ISO string (legacy moment-serialized values already in users' globalState). Returns NaN for unparseable input so callers can guard.
export function daysSince(stored: string | number): number {
  const time = new Date(stored).getTime();
  if (Number.isNaN(time)) return NaN;
  return (Date.now() - time) / DAY_MS;
}
