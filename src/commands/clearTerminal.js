import vscode from "vscode";

const clearTerminalHandler = function () {
  return vscode.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    {
      text: "\u0003 clear \u000D",
    }
  );
};

export const clearTerminal = {
  name: "clearTerminal",
  handler: clearTerminalHandler,
};
