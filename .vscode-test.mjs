import { defineConfig } from "@vscode/test-cli";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const fixtures = resolve(".vscode-test/theme-workspaces");
const folder = resolve(fixtures, "project-a");
const secondFolder = resolve(fixtures, "project-b");
mkdirSync(folder, { recursive: true });
mkdirSync(secondFolder, { recursive: true });

const workspaces = { folder };
for (const [name, folders] of Object.entries({
  "multi-root": [{ path: folder }, { path: secondFolder }],
  "empty-workspace": [],
})) {
  const file = resolve(fixtures, `${name}.code-workspace`);
  writeFileSync(file, JSON.stringify({ folders, settings: {} }));
  workspaces[name] = file;
}

export default defineConfig([
  { label: "no-workspace", files: "out/test/**/*.test.js" },
  ...Object.entries(workspaces).map(([label, workspaceFolder]) => ({
    label,
    files: "out/test/suite/chooseTerminalTheme.test.js",
    workspaceFolder,
  })),
]);
