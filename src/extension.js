import vscode from "vscode";
import showMessage from "./messages";

import commands from "./commands";

function createCommandName(name) {
  return `terminalAllInOne.${name}`;
}

function registerCommand({ commandName, handler, context }) {
  return context.subscriptions.push(
    vscode.commands.registerCommand(commandName, handler)
  );
}

function createCommands(context) {
  commands.forEach((command) => {
    const { name, handler, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handler, context });
    vscode.workspace.onDidChangeConfiguration(config);
  });
}

export function activate(context) {
  const o = vscode.window.createOutputChannel("ee");
  commands.forEach((cmd) => {
    o.appendLine(JSON.stringify(cmd));
  });
  showMessage("onstart", context);
  createCommands(context);
}

export function deactivate() {}
