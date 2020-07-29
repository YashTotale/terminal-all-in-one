const vscode = require("vscode");

const EXTENSION_NAME = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";

const messages = {
  onstart: ({ onselection }) => {
    vscode.window
      .showInformationMessage(
        `Thanks for installing ${READABLE_EXTENSION_NAME}. Check out our README for more information on the extension.`,
        "README"
      )
      .then((selection) => {
        if (selection === "README") {
          vscode.env.openExternal(`vscode:extension/${EXTENSION_NAME}`);
        }
        if (onselection) {
          onselection(selection);
        }
      });
  },
  themeDoesNotExist: () => {
    vscode.window
      .showErrorMessage(
        "That theme doesn't exist. Please take a screenshot and open a new issue in the github repository.",
        "Issues Page"
      )
      .then((selection) => {
        if (selection === "Issues Page") {
          vscode.env.openExternal(
            "https://github.com/YashTotale/terminal-all-in-one/issues"
          );
        }
      });
  },
};

function showMessage(id, params) {
  return messages[id](params);
}

exports.showMessage = showMessage;
