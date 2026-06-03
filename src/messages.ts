import { window, commands, env, Uri, ExtensionContext } from "vscode";
import { getConfig } from "./helpers/config";
import {
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
  READABLE_EXTENSION_NAME,
  stateProps,
} from "./helpers/constants";

const DONT_SHOW = "Don't Show Again";

export function messagesEnabled() {
  return !getConfig({ section: `${EXTENSION_NAME}.disableAllMessages` });
}

// One-time welcome on first install.
export async function showWelcome() {
  if (!messagesEnabled()) return;
  const selection = await window.showInformationMessage(
    `Thanks for installing ${READABLE_EXTENSION_NAME}. Check out our README for more information on the extension.`,
    "README",
  );
  if (selection === "README") {
    commands.executeCommand("extension.open", EXTENSION_NAME_W_PUBLISHER);
  }
}

// Rating prompt shown 30 days after install, then every 30 days until rated or dismissed with "Don't Show Again".
export async function showRatingPrompt(context: ExtensionContext) {
  if (!messagesEnabled()) return;
  const selection = await window.showInformationMessage(
    `You've been using ${READABLE_EXTENSION_NAME} for some time. I hope it's been useful. Would you mind giving it a quick rating?`,
    "No Problem!",
    DONT_SHOW,
  );
  if (selection === "No Problem!") {
    env.openExternal(
      Uri.parse(
        `https://marketplace.visualstudio.com/items?itemName=${EXTENSION_NAME_W_PUBLISHER}&ssr=false#review-details`,
      ),
    );
    context.globalState.update(stateProps.SHOULD_NOT_SHOW_FOLLOW_UP, true);
  } else if (selection === DONT_SHOW) {
    context.globalState.update(stateProps.SHOULD_NOT_SHOW_FOLLOW_UP, true);
  }
}

export async function showThemeDoesNotExist() {
  if (!messagesEnabled()) return;
  const selection = await window.showErrorMessage(
    "That theme doesn't seem to exist. Please open a new issue in the github repository if this theme does exist.",
    "Issues Page",
  );
  if (selection === "Issues Page") {
    env.openExternal(
      Uri.parse("https://github.com/YashTotale/terminal-all-in-one/issues"),
    );
  }
}

export async function showNoScripts(index?: number) {
  if (!messagesEnabled()) return;
  const message =
    typeof index === "number"
      ? "No script has been defined for that index"
      : "No scripts have been defined";
  const selection = await window.showWarningMessage(
    message,
    "Settings",
    "Scripts Explained",
  );
  if (selection === "Settings") {
    commands.executeCommand("workbench.action.openSettingsJson");
  } else if (selection === "Scripts Explained") {
    env.openExternal(
      Uri.parse(
        `https://marketplace.visualstudio.com/items?itemName=${EXTENSION_NAME_W_PUBLISHER}#scripts`,
      ),
    );
  }
}

export function showError(message: string) {
  if (!messagesEnabled()) return;
  window.showErrorMessage(message);
}
