import { test } from "node:test";
import assert from "node:assert/strict";
import { nextVersion, resolvePlan } from "./release-plan.mjs";

test("nextVersion bumps major/minor/patch", () => {
  assert.equal(nextVersion("1.12.2", "major"), "2.0.0");
  assert.equal(nextVersion("1.12.2", "minor"), "1.13.0");
  assert.equal(nextVersion("1.12.2", "patch"), "1.12.3");
});

test("nextVersion throws on an unknown bump", () => {
  assert.throws(() => nextVersion("1.0.0", "huge"), /bump/);
});

const base = {
  current: "1.12.2",
  published: "1.12.2",
  bump: "major",
  tagExists: false,
  headMatchesTag: false,
  releaseComplete: false,
};

test("normal release bumps from current when nothing is in flight", () => {
  assert.deepEqual(resolvePlan(base), { mode: "normal", version: "2.0.0" });
});

test("normal release after a clean prior release (tag + complete release present)", () => {
  const plan = resolvePlan({
    ...base,
    current: "2.0.0",
    published: "2.0.0",
    bump: "minor",
    tagExists: true,
    headMatchesTag: true,
    releaseComplete: true,
  });
  assert.deepEqual(plan, { mode: "normal", version: "2.1.0" });
});

test("orphan (Marketplace ahead of master) aborts", () => {
  const plan = resolvePlan({ ...base, current: "1.12.2", published: "2.0.0" });
  assert.equal(plan.mode, "orphan");
  assert.equal(plan.abort, true);
  assert.match(plan.message, /2\.0\.0/);
});

test("finalize reuses the current version when its release is incomplete and HEAD matches the tag", () => {
  const plan = resolvePlan({
    ...base,
    current: "2.0.0",
    published: "2.0.0",
    tagExists: true,
    headMatchesTag: true,
    releaseComplete: false,
  });
  assert.deepEqual(plan, { mode: "finalize", version: "2.0.0" });
});

test("finalize aborts when HEAD has moved past the tag", () => {
  const plan = resolvePlan({
    ...base,
    current: "2.0.0",
    published: "2.0.0",
    tagExists: true,
    headMatchesTag: false,
    releaseComplete: false,
  });
  assert.equal(plan.mode, "finalize");
  assert.equal(plan.abort, true);
  assert.match(plan.message, /HEAD/);
});

test("a complete release for the current version is not re-finalized", () => {
  const plan = resolvePlan({
    ...base,
    current: "2.0.0",
    published: "2.0.0",
    tagExists: true,
    headMatchesTag: true,
    releaseComplete: true,
  });
  assert.equal(plan.mode, "normal");
});

test("a lower published version is not treated as orphan", () => {
  const plan = resolvePlan({
    ...base,
    current: "2.0.0",
    published: "1.12.2",
    bump: "patch",
    tagExists: false,
  });
  assert.deepEqual(plan, { mode: "normal", version: "2.0.1" });
});
