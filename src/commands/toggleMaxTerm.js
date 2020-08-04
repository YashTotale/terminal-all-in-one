const vscode = require("vscode");

const toggleMaxTerm = function () {
  vscode.commands.executeCommand("workbench.action.terminal.focus");
  vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
};

module.exports = {
  name: "toggleMaxTerm",
  handler: toggleMaxTerm,
};
