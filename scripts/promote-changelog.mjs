import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import process from "node:process";

const CHANGELOG_PATH = "CHANGELOG.md";

// Body of the "### [<version>]" section: lines until the next "### [" heading, with the trailing --- separator and surrounding whitespace stripped. Returns null if the heading is absent.
export function extractNotes(content, version) {
  const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const headingRe = new RegExp(`^### \\[${escaped}\\]`);
  const lines = content.split("\n");
  const start = lines.findIndex((line) => headingRe.test(line));
  if (start === -1) return null;
  const body = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^### \[/.test(lines[i])) break;
    body.push(lines[i]);
  }
  return body
    .join("\n")
    .replace(/\n\s*-{3,}\s*$/, "")
    .trim();
}

// Promote "### [Unreleased]" to "### [<version>] - (<date>)" and open a fresh empty Unreleased section above it. Returns the rewritten file and the released notes. Throws if there is nothing to release.
export function promote(content, version, date) {
  const notes = extractNotes(content, "Unreleased");
  if (notes === null) {
    throw new Error("No ### [Unreleased] section found in CHANGELOG.md");
  }
  if (notes === "") {
    throw new Error(
      "The ### [Unreleased] section is empty — nothing to release",
    );
  }
  const promoted = content.replace(
    "### [Unreleased]",
    `### [Unreleased]\n\n---\n\n### [${version}] - (${date})`,
  );
  return { promoted, notes };
}

async function main() {
  const [mode, version, date] = process.argv.slice(2);
  const content = await readFile(CHANGELOG_PATH, "utf8");

  if (mode === "promote") {
    if (!version || !date) {
      throw new Error("Usage: promote-changelog.mjs promote <version> <date>");
    }
    const { promoted, notes } = promote(content, version, date);
    await writeFile(CHANGELOG_PATH, promoted);
    process.stdout.write(notes);
    return;
  }

  if (mode === "notes") {
    if (!version) {
      throw new Error("Usage: promote-changelog.mjs notes <version>");
    }
    const notes = extractNotes(content, version);
    if (notes === null) {
      throw new Error(`No ### [${version}] section found in CHANGELOG.md`);
    }
    process.stdout.write(notes);
    return;
  }

  throw new Error(`Unknown mode "${mode}" (expected "promote" or "notes")`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
