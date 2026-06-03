import { window, commands, QuickPickItem } from "vscode";

import { getConfig } from "../helpers/config";
import { EXTENSION_NAME } from "../helpers/constants";
import { showNoScripts } from "../messages";

interface ScriptObject {
  name: string;
  script: string | string[];
}

interface ScriptPickItem extends QuickPickItem {
  index: number;
}

export async function runScript(index?: number) {
  const scripts = getScriptsConfig();

  if (typeof index === "number") {
    if (index < scripts.length) {
      execute(scripts[index]);
    } else {
      showNoScripts(index);
    }
    return;
  }

  if (!scripts.length) {
    showNoScripts();
    return;
  }

  const items: ScriptPickItem[] = scripts.map(({ name, script }, i) => ({
    label: name,
    description: Array.isArray(script) ? script.join(" -> ") : script,
    index: i,
  }));
  const selected = await window.showQuickPick<ScriptPickItem>(items, {
    matchOnDescription: true,
    matchOnDetail: true,
    placeHolder: "Run a Script",
  });
  if (selected) execute(scripts[selected.index]);
}

export function execute({ name, script }: ScriptObject) {
  const command = Array.isArray(script) ? script.join(" && ") : script;
  // Reuse the active terminal so the script runs in the user's session (cwd/env); otherwise open one named after the script.
  const terminal = window.activeTerminal ?? window.createTerminal(name);
  terminal.show();
  // sendSequence (not sendText) so VS Code resolves variables like ${workspaceFolder}, ${file}, ${selectedText}, ${config:Name}. The trailing carriage return runs the command; omit it to only insert (disableAutoRun).
  const text = getDisableAutoRun() ? command : `${command}\r`;
  return commands.executeCommand("workbench.action.terminal.sendSequence", {
    text,
  });
}

export function getScriptsConfig(): ScriptObject[] {
  const scripts = getConfig({ config: EXTENSION_NAME, section: "scripts" });
  if (!Array.isArray(scripts)) return [];
  return scripts.filter(
    (s): s is ScriptObject =>
      !!s &&
      typeof s.name === "string" &&
      (typeof s.script === "string" || Array.isArray(s.script)),
  );
}

function getDisableAutoRun(): boolean {
  return (
    getConfig({ config: EXTENSION_NAME, section: "script.disableAutoRun" }) ===
    true
  );
}
