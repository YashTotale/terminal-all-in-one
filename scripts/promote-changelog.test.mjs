import { test } from "node:test";
import assert from "node:assert/strict";
import { extractNotes, promote } from "./promote-changelog.mjs";

const SAMPLE = [
  "## _Terminal All In One_ Change Log",
  "",
  "---",
  "",
  "### [Unreleased]",
  "",
  "#### Added",
  "",
  "- A shiny new option.",
  "",
  "#### Fixed",
  "",
  "- A pesky bug.",
  "",
  "---",
  "",
  "### [1.12.2] - (2024-03-17)",
  "",
  "#### Changed",
  "",
  "- README header",
  "",
].join("\n");

test("extractNotes returns a section body without heading or rules", () => {
  assert.equal(
    extractNotes(SAMPLE, "1.12.2"),
    "#### Changed\n\n- README header",
  );
});

test("extractNotes returns null for a missing section", () => {
  assert.equal(extractNotes(SAMPLE, "9.9.9"), null);
});

test("extractNotes keeps a --- inside the body, dropping only the trailing one", () => {
  const withRule = [
    "### [Unreleased]",
    "",
    "#### Added",
    "",
    "- Before the rule.",
    "",
    "---",
    "",
    "- After the rule.",
    "",
    "---",
    "",
    "### [1.0.0] - (2020-01-01)",
    "",
    "- Initial",
    "",
  ].join("\n");
  assert.equal(
    extractNotes(withRule, "Unreleased"),
    "#### Added\n\n- Before the rule.\n\n---\n\n- After the rule.",
  );
});

test("promote moves Unreleased content under a dated version heading", () => {
  const { promoted } = promote(SAMPLE, "2.0.0", "2026-06-03");
  assert.match(promoted, /### \[2\.0\.0\] - \(2026-06-03\)/);
  assert.match(promoted, /### \[2\.0\.0\][\s\S]*- A shiny new option\./);
});

test("promote opens a fresh empty Unreleased section above the new version", () => {
  const { promoted } = promote(SAMPLE, "2.0.0", "2026-06-03");
  assert.equal(extractNotes(promoted, "Unreleased"), "");
  assert.ok(
    promoted.indexOf("### [Unreleased]") < promoted.indexOf("### [2.0.0]"),
  );
});

test("promote returns the released notes (no date line, no rules)", () => {
  const { notes } = promote(SAMPLE, "2.0.0", "2026-06-03");
  assert.equal(
    notes,
    "#### Added\n\n- A shiny new option.\n\n#### Fixed\n\n- A pesky bug.",
  );
});

test("promote throws when there is no Unreleased section", () => {
  const none = SAMPLE.replace("### [Unreleased]", "### [0.0.1] - (2020-01-01)");
  assert.throws(
    () => promote(none, "2.0.0", "2026-06-03"),
    /No ### \[Unreleased\]/,
  );
});

test("promote throws when the Unreleased section is empty", () => {
  const empty = [
    "## Change Log",
    "",
    "---",
    "",
    "### [Unreleased]",
    "",
    "---",
    "",
    "### [1.0.0] - (2020-01-01)",
    "",
    "- Initial",
    "",
  ].join("\n");
  assert.throws(() => promote(empty, "2.0.0", "2026-06-03"), /empty/);
});
