const vscode = require("vscode");
const { get } = require("http");

const EXTENSION_NAME = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";

const TERMINAL_MESSAGES_CONFIG = "terminalAllInOne.messages";

function onTerminalMessagesConfigChange(event) {}

function getConfig() {
  return vscode.workspace.getConfiguration(TERMINAL_MESSAGES_CONFIG);
}

async function updateConfig(key, value) {
  try {
    await getConfig().update(key, value, true);
  } catch ({ message }) {
    vscode.window.showErrorMessage(message);
  }
}

const messages = {
  // Message on start
  onstart: async (context) => {
    const STATE_PROPERTY = "shouldNotShowOnStartMessage";
    if (!context.globalState.get(STATE_PROPERTY)) {
      const selection = await vscode.window.showInformationMessage(
        `Thanks for installing ${READABLE_EXTENSION_NAME}. Check out our README for more information on the extension.`,
        "README"
      );
      context.globalState.update(STATE_PROPERTY, true);
      if (selection === "README") {
        // @ts-ignore
        vscode.env.openExternal(`vscode:extension/${EXTENSION_NAME}`);
      }
    }
  },
  //Message when the theme quick pick is opened
  themeQuickPickOpened: async () => {
    const SELECTION = "Don't Show Again";
    const CONFIG_PROPERTY = "shouldShowThemeQuickPickMessage";
    if (getConfig().get(CONFIG_PROPERTY)) {
      const selection = await vscode.window.showInformationMessage(
        "Open the terminal to see a live preview",
        SELECTION
      );
      if (selection === SELECTION) {
        await updateConfig(CONFIG_PROPERTY, false);
      }
    }
  },
  //Message when a theme that does not exist is chosen
  themeDoesNotExist: async () => {
    const selection = await vscode.window.showErrorMessage(
      "That theme doesn't seem to exist. Please open a new issue in the github repository if this theme does exist.",
      "Issues Page"
    );
    if (selection === "Issues Page") {
      vscode.env.openExternal(
        // @ts-ignore
        "https://github.com/YashTotale/terminal-all-in-one/issues"
      );
    }
  },
  //Message when a theme is selected
  themeSelected: async (selectedTheme) => {
    const SELECTION = "Don't Show Again";
    const CONFIG_PROPERTY = "shouldShowSelectedThemeMessage";
    if (getConfig().get(CONFIG_PROPERTY)) {
      const selection = await vscode.window.showInformationMessage(
        `"${selectedTheme}" has been applied`,
        SELECTION
      );
      if (selection === SELECTION) {
        await updateConfig(CONFIG_PROPERTY, false);
      }
    }
  },
};

function showMessage(id, params) {
  return messages[id](params);
}

module.exports = {
  showMessage,
  onTerminalMessagesConfigChange,
};
