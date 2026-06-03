import { window, commands, ExtensionContext, QuickPickItem } from "vscode";
import BaseCommand from "./baseCommand";
import { showNoScripts } from "../messages";

interface ScriptObject {
  name: string;
  script: string | string[];
}

interface ScriptPickItem extends QuickPickItem {
  index: number;
}

export default class RunScript extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("runScript", (index?: number) => this.handler(index));
  }

  handler(index?: number) {
    const scripts = this.getScriptsConfig();

    if (typeof index === "number") {
      if (index < scripts.length) {
        this.execute(scripts[index]);
      } else {
        showNoScripts(index);
      }
      return undefined;
    }

    if (!scripts.length) {
      showNoScripts();
      return undefined;
    }

    const items: ScriptPickItem[] = scripts.map(({ name, script }, i) => ({
      label: name,
      description: Array.isArray(script) ? script.join(" -> ") : script,
      index: i,
    }));
    return this.showQuickPick<ScriptPickItem>(
      items,
      { placeHolder: "Run a Script" },
      (selected) => this.execute(scripts[selected.index]),
    );
  }

  execute({ name, script }: ScriptObject) {
    const command = Array.isArray(script) ? script.join(" && ") : script;
    // Reuse the active terminal so the script runs in the user's session (cwd/env); otherwise open one named after the script.
    const terminal = window.activeTerminal ?? window.createTerminal(name);
    terminal.show();
    // sendSequence (not sendText) so VS Code resolves variables like ${workspaceFolder}, ${file}, ${selectedText}, ${config:Name}. The trailing carriage return runs the command; omit it to only insert (disableAutoRun).
    const text = this.getDisableAutoRunConfig() ? command : `${command}\r`;
    return commands.executeCommand("workbench.action.terminal.sendSequence", {
      text,
    });
  }

  getScriptsConfig(): ScriptObject[] {
    const scripts = this.getExtensionConfig("scripts");
    if (!Array.isArray(scripts)) return [];
    return scripts.filter(
      (s): s is ScriptObject =>
        !!s &&
        typeof s.name === "string" &&
        (typeof s.script === "string" || Array.isArray(s.script)),
    );
  }

  getDisableAutoRunConfig(): boolean {
    return this.getExtensionConfig("script.disableAutoRun") === true;
  }
}
