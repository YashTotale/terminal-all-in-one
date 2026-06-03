import { commands, workspace, ExtensionContext } from "vscode";
import { showWelcome, showRatingPrompt } from "./messages";
import commandList from "./commands";
import { EXTENSION_NAME, stateProps } from "./helpers/constants";
import { daysSince } from "./helpers/time";

function createCommandName(name: string) {
  return `${EXTENSION_NAME}.${name}`;
}

function createCommands(context: ExtensionContext) {
  commandList.forEach((command) => {
    context.subscriptions.push(
      commands.registerCommand(
        createCommandName(command.name),
        command.handler,
      ),
    );
    if (command.config) {
      context.subscriptions.push(
        workspace.onDidChangeConfiguration(command.config),
      );
    }
  });
}

export function onFirstActivate(context: ExtensionContext) {
  if (!context.globalState.get(stateProps.LAST_FOLLOW_UP)) {
    showWelcome();
    context.globalState.update(stateProps.LAST_FOLLOW_UP, Date.now());
  }
}

export function timeSinceInstall(context: ExtensionContext) {
  const stored = context.globalState.get(stateProps.LAST_FOLLOW_UP);
  if (stored === undefined) return;
  if (context.globalState.get(stateProps.SHOULD_NOT_SHOW_FOLLOW_UP)) return;
  if (daysSince(stored as string | number) >= 30) {
    showRatingPrompt(context);
    context.globalState.update(stateProps.LAST_FOLLOW_UP, Date.now());
  }
}

export function activate(context: ExtensionContext) {
  onFirstActivate(context);
  createCommands(context);
  timeSinceInstall(context);
}

export function deactivate() {
  // Nothing to do here
}
