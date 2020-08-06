const vscode = require("vscode");
const { getConfig, updateConfig } = require("./helpers/config");

const EXTENSION_NAME = "terminalAllInOne";
const EXTENSION_NAME_W_PUBLISHER = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";

const TERMINAL_MESSAGES_CONFIG = `${EXTENSION_NAME}.messages`;

const DONT_SHOW = "Don't Show Again";

function getMessagesConfig(key) {
  return getConfig({ config: TERMINAL_MESSAGES_CONFIG, section: key });
}

async function infoWithDisableOption(configProperty, info) {
  if (getMessagesConfig(configProperty)) {
    const selection = await vscode.window.showInformationMessage(
      info,
      DONT_SHOW
    );
    if (selection === DONT_SHOW) {
      await updateMessagesConfig(configProperty, false);
    }
  }
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
    await infoWithDisableOption(
      "shouldShowThemeQuickPickMessage",
      "Open the terminal to see a live preview"
    );
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
    infoWithDisableOption(
      "shouldShowSelectedThemeMessage",
      `"${selectedTheme}" has been applied`
    );
  },
  //Message when the font size quick pick is opened
  fontSizeQuickPickOpened: async () => {
    infoWithDisableOption(
      "shouldShowFontSizeQuickPickMessage",
      "Open the terminal for a live preview. If a terminal was already open and you cannot see your previous commands, scroll up in the terminal."
    );
  },
  fontSizeSelected: async (selectedSize) => {
    infoWithDisableOption(
      "shouldShowFontSizeSelectedMessage",
      `Font Size "${selectedSize}" has been applied`
    );
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
