import { commands, workspace } from "vscode";
import showMessage from "./messages";

import cmds from "./commands";

function createCommandName(name) {
  return `terminalAllInOne.${name}`;
}

function registerCommand({ commandName, handler, context }) {
  return context.subscriptions.push(
    commands.registerCommand(commandName, handler)
  );
}

function createCommands(context) {
  cmds.forEach((command) => {
    const { name, handler, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handler, context });
    workspace.onDidChangeConfiguration(config);
  });
}

export function activate(context) {
  showMessage("onstart", context);
  createCommands(context);
}

export function deactivate() {}
