const vscode = require("vscode");

const clearTerminal = function () {
  return vscode.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    {
      text: "\u0003 clear \u000D",
    }
  );
};

module.exports = {
  name: "clearTerminal",
  handler: clearTerminal,
};
