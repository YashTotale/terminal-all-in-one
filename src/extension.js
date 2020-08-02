// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.deactivate = exports.activate = void 0;

const vscode = require("vscode");
const { showMessage } = require("./messages");

const EXTENSION_NAME = "terminalAllInOne";
const READABLE_EXTENSION_NAME = "Terminal All In One";
const EXTENSION_NAME_W_PUBLISHER = "yasht.terminal-all-in-one";

const {
  chooseTerminalTheme,
  onTerminalThemeConfigChange,
} = require("./commands/terminalTheme");

function registerCommand({ name, handler }) {
  return vscode.commands.registerCommand(name, handler);
}

function createCommands(context) {
  const commands = [
    {
      name: "terminalAllInOne.toggleMaxTerm",
      handler: () => {
        vscode.commands.executeCommand("workbench.action.terminal.focus");
        vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
      },
    },
    {
      name: "terminalAllInOne.chooseTerminalTheme",
      handler: () => chooseTerminalTheme(),
    },
  ];

  context.subscriptions.push(commands.map(registerCommand));
}

function onTerminalConfigChange() {
  vscode.workspace.onDidChangeConfiguration((event) => {
    onTerminalThemeConfigChange(event);
  });
}

function activate(context) {
  showMessage("onstart", context);
  createCommands(context);
  onTerminalConfigChange();
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
  EXTENSION_NAME,
  READABLE_EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
};
