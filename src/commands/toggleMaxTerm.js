import vscode from "vscode";

const toggleMaxTermHandler = function () {
  vscode.commands.executeCommand("workbench.action.terminal.focus");
  vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
};

export const toggleMaxTerm = {
  name: "toggleMaxTerm",
  handler: toggleMaxTermHandler,
};
