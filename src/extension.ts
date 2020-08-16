import { commands, workspace, ExtensionContext } from "vscode";
import moment from "moment";
import showMessage from "./messages";
import cmds from "./commands";

import state from "./helpers/globalState";
import { EXTENSION_NAME, stateProps } from "./helpers/constants";

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
  cmds(context).forEach((command: command) => {
    const { name, handler, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handler, context });
    workspace.onDidChangeConfiguration(config);
  });
}

function onFirstActivate(context: ExtensionContext) {
  if (!state.get(context, stateProps.SHOULD_NOT_SHOW_ON_START)) {
    showMessage("onFirstStart");
    state.update(context, stateProps.DATE_INSTALLED, moment());
    state.update(context, stateProps.SHOULD_NOT_SHOW_ON_START, true);
  }
}

function timeSinceInstall(context: ExtensionContext) {
  const dateInstalled = state.get(context, stateProps.DATE_INSTALLED);
  const currentDate = moment();
  //@ts-expect-error
  const diff = currentDate.diff(dateInstalled, "days");
  if (diff >= 30 && !state.get(context, stateProps.SHOULD_NOT_SHOW_FOLLOW_UP)) {
    showMessage("followUp");
    state.update(context, stateProps.SHOULD_NOT_SHOW_FOLLOW_UP, true);
  }
}

export function activate(context: ExtensionContext) {
  onFirstActivate(context);
  createCommands(context);
  timeSinceInstall(context);
}

export function deactivate() {}
