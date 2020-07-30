const vscode = require("vscode");

const EXTENSION_NAME = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";

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
  themeQuickPickOpened: async (context) => {
    const SELECTION = "Don't Show Again";
    const STATE_PROPERTY = "shouldNotShowQuickPickMessage";
    if (!context.globalState.get(STATE_PROPERTY)) {
      const selection = await vscode.window.showInformationMessage(
        "Open the terminal to see a live preview",
        SELECTION
      );
      if (selection === SELECTION) {
        context.globalState.update(STATE_PROPERTY, true);
      }
    }
  },
  //Message when a theme that does not exist is chosen
  themeDoesNotExist: () => {
    vscode.window
      .showErrorMessage(
        "That theme doesn't seem to exist. Please open a new issue in the github repository if this theme does exist.",
        "Issues Page"
      )
      .then((selection) => {
        if (selection === "Issues Page") {
          vscode.env.openExternal(
            // @ts-ignore
            "https://github.com/YashTotale/terminal-all-in-one/issues"
          );
        }
      });
  },
  //Message when a theme is selected
  themeSelected: ({ selectedTheme, context }) => {
    const STATE_PROPERTY = "shouldNotShowSelectedThemeMessage";
    const SELECTION = "Don't Show Again";
    if (!context.globalState.get(STATE_PROPERTY)) {
      vscode.window
        .showInformationMessage(
          `"${selectedTheme}" has been applied`,
          SELECTION
        )
        .then((selection) => {
          if (selection === SELECTION) {
            context.globalState.update(STATE_PROPERTY, true);
          }
        });
    }
  },
};

function showMessage(id, params) {
  return messages[id](params);
}

exports.showMessage = showMessage;
