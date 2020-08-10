import { commands } from "vscode";

const clearTerminalHandler = () => {
  return commands.executeCommand("workbench.action.terminal.sendSequence", {
    text: "\u0003 clear \u000D",
  });
};

export const clearTerminal = {
  name: "clearTerminal",
  handler: clearTerminalHandler,
};
