import { commands, workspace, ExtensionContext } from "vscode";
import showMessage from "./messages";
import cmds from "./commands";
import { EXTENSION_NAME } from "./helpers/constants";

function createCommandName(name: string) {
  return `${EXTENSION_NAME}.${name}`;
}

interface registerCommand {
  commandName: string;
  handler: (...args: any[]) => any;
  context: ExtensionContext;
}

function registerCommand({ commandName, handler, context }: registerCommand) {
  return context.subscriptions.push(
    commands.registerCommand(commandName, handler)
  );
}

interface command {
  name: string;
  handler: (...args: any[]) => any;
  config?: any;
}

function createCommands(context: ExtensionContext) {
  cmds.forEach((command: command) => {
    const { name, handler, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handler, context });
    workspace.onDidChangeConfiguration(config);
  });
}

export function activate(context: ExtensionContext) {
  showMessage("onstart", context);
  createCommands(context);
}

export function deactivate() {}
