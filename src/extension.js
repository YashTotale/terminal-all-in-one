const vscode = require("vscode");
const { showMessage } = require("./messages");

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
  EXTENSION_NAME: "terminalAllInOne",
  READABLE_EXTENSION_NAME: "Terminal All In One",
  EXTENSION_NAME_W_PUBLISHER: "yasht.terminal-all-in-one",
};
