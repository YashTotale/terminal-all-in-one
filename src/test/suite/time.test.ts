import assert from "assert";
import { daysSince, DAY_MS } from "../../helpers/time";

suite("daysSince", () => {
  test("computes days from a legacy ISO string (moment-serialized value)", () => {
    const tenDaysAgo = new Date(Date.now() - 10 * DAY_MS).toISOString();
    const d = daysSince(tenDaysAgo);
    assert.ok(d >= 9.9 && d <= 10.1, `expected ~10, got ${d}`);
  });

  test("computes days from a millisecond number (new value)", () => {
    const fortyDaysAgo = Date.now() - 40 * DAY_MS;
    assert.ok(daysSince(fortyDaysAgo) >= 39.9, "expected >= ~40 days");
  });

  test("returns NaN for unparseable input", () => {
    assert.ok(Number.isNaN(daysSince("not a date")));
  });
});
