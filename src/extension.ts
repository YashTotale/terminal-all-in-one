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
  handlerFunc: (...args: any[]) => any;
  context: ExtensionContext;
}

function registerCommand({
  commandName,
  handlerFunc,
  context,
}: registerCommand) {
  return context.subscriptions.push(
    commands.registerCommand(commandName, handlerFunc)
  );
}

interface Command {
  name: string;
  handlerFunc: (...args: any[]) => any;
  config?: any;
}

function createCommands(context: ExtensionContext) {
  cmds(context).forEach((command: Command) => {
    const { name, handlerFunc, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handlerFunc, context });
    workspace.onDidChangeConfiguration(config);
  });
}

function onFirstActivate(context: ExtensionContext) {
  if (!state.get(context, stateProps.SHOULD_NOT_SHOW_ON_START)) {
    showMessage("onFirstStart");
    state.update(context, stateProps.LAST_FOLLOW_UP, moment());
    state.update(context, stateProps.SHOULD_NOT_SHOW_ON_START, true);
  }
}

function timeSinceInstall(context: ExtensionContext) {
  const lastFollowUp = state.get(context, stateProps.LAST_FOLLOW_UP) as Date;
  const currentDate = moment();
  const diff = currentDate.diff(lastFollowUp, "days");
  if (diff >= 30 && !state.get(context, stateProps.SHOULD_NOT_SHOW_FOLLOW_UP)) {
    showMessage("followUp", context);
    state.update(context, stateProps.LAST_FOLLOW_UP, moment());
  }
}

export function activate(context: ExtensionContext) {
  onFirstActivate(context);
  createCommands(context);
  timeSinceInstall(context);
}

export function deactivate() {}
