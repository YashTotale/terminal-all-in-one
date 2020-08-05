const vscode = require("vscode");
const { getConfig, updateConfig } = require("./helpers/config");

const EXTENSION_NAME = "terminalAllInOne";
const EXTENSION_NAME_W_PUBLISHER = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";

const TERMINAL_MESSAGES_CONFIG = `${EXTENSION_NAME}.messages`;

function getMessagesConfig(key) {
  return getConfig({ config: TERMINAL_MESSAGES_CONFIG, section: key });
}

async function updateMessagesConfig(key, value) {
  updateConfig({
    section: TERMINAL_MESSAGES_CONFIG,
    value: {
      ...getConfig({ section: TERMINAL_MESSAGES_CONFIG }),
      [key]: value,
    },
  });
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
        vscode.env.openExternal(
          `vscode:extension/${EXTENSION_NAME_W_PUBLISHER}`
        );
      }
    }
  },
  //Message when the theme quick pick is opened
  themeQuickPickOpened: async () => {
    const SELECTION = "Don't Show Again";
    const CONFIG_PROPERTY = "shouldShowThemeQuickPickMessage";
    if (getMessagesConfig(CONFIG_PROPERTY)) {
      const selection = await vscode.window.showInformationMessage(
        "Open the terminal to see a live preview",
        SELECTION
      );
      if (selection === SELECTION) {
        await updateMessagesConfig(CONFIG_PROPERTY, false);
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
        "https://github.com/YashTotale/terminal-all-in-one/issues"
      );
    }
  },
  //Message when a theme is selected
  themeSelected: async (selectedTheme) => {
    const SELECTION = "Don't Show Again";
    const CONFIG_PROPERTY = "shouldShowSelectedThemeMessage";
    if (getMessagesConfig(CONFIG_PROPERTY)) {
      const selection = await vscode.window.showInformationMessage(
        `"${selectedTheme}" has been applied`,
        SELECTION
      );
      if (selection === SELECTION) {
        await updateMessagesConfig(CONFIG_PROPERTY, false);
      }
    }
  },
  error: (message) => {
    vscode.window.showErrorMessage(message);
  },
};

exports.showMessage = function (id, params) {
  const shouldShow = !getConfig({
    section: `${EXTENSION_NAME}.disableAllMessages`,
  });
  if (shouldShow) {
    return messages[id](params);
  }
};
