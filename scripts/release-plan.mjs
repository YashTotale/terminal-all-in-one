import { appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import process from "node:process";

// Next version for a major/minor/patch bump of an x.y.z version.
export function nextVersion(current, bump) {
  const [major, minor, patch] = current.split(".").map(Number);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  if (bump === "patch") return `${major}.${minor}.${patch + 1}`;
  throw new Error(`Unknown bump "${bump}" (expected major, minor, or patch)`);
}

// Numeric compare of two x.y.z versions: >0 if a>b, <0 if a<b, 0 if equal.
function compare(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

// Decide what a release run should do, from durable facts. Returns either
// { mode, version } to proceed, or { mode, abort: true, message } to stop.
export function resolvePlan({
  current,
  published,
  bump,
  tagExists,
  headMatchesTag,
  releaseComplete,
}) {
  if (compare(published, current) > 0) {
    return {
      mode: "orphan",
      abort: true,
      message: `Marketplace has v${published} but master is at v${current} with no v${published} tag. A prior release published without pushing its commit/tag; reconcile v${published} manually (push its commit + tag and create the Release) before re-running.`,
    };
  }
  if (tagExists && !releaseComplete) {
    if (!headMatchesTag) {
      return {
        mode: "finalize",
        abort: true,
        message: `Tag v${current} exists but its Release is missing or has no asset, and HEAD has moved past the tagged commit. Re-run from the tagged commit so the Release asset matches the published build, or reconcile manually.`,
      };
    }
    return { mode: "finalize", version: current };
  }
  return { mode: "normal", version: nextVersion(current, bump) };
}

function main() {
  const plan = resolvePlan({
    current: process.env.CURRENT,
    published: process.env.PUBLISHED,
    bump: process.env.BUMP,
    tagExists: process.env.TAG_EXISTS === "true",
    headMatchesTag: process.env.HEAD_MATCHES_TAG === "true",
    releaseComplete: process.env.RELEASE_COMPLETE === "true",
  });
  if (plan.abort) {
    console.log(`::error::${plan.message}`);
    process.exitCode = 1;
    return;
  }
  const vsix = `terminal-all-in-one-${plan.version}.vsix`;
  console.log(`${plan.mode} release: v${plan.version}`);
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `version=${plan.version}\nvsix=${vsix}\nmode=${plan.mode}\n`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
