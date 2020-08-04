// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.deactivate = exports.activate = void 0;

const vscode = require("vscode");
const { showMessage } = require("./messages");

const EXTENSION_NAME = "terminalAllInOne";
const READABLE_EXTENSION_NAME = "Terminal All In One";
const EXTENSION_NAME_W_PUBLISHER = "yasht.terminal-all-in-one";

const commands = require("./commands");

function createCommandName(name) {
  return `terminalAllInOne.${name}`;
}

function registerCommand({ commandName, handler, context }) {
  return context.subscriptions.push(
    vscode.commands.registerCommand(commandName, handler)
  );
}

function createCommands(context) {
  commands.forEach((command) => {
    const { name, handler, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handler, context });
    vscode.workspace.onDidChangeConfiguration(config);
  });
}

function activate(context) {
  showMessage("onstart", context);
  createCommands(context);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
  EXTENSION_NAME,
  READABLE_EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
};
