import { commands } from "vscode";

const toggleMaxTermHandler = () => {
  commands.executeCommand("workbench.action.terminal.focus");
  commands.executeCommand("workbench.action.toggleMaximizedPanel");
};

export const toggleMaxTerm = {
  name: "toggleMaxTerm",
  handler: toggleMaxTermHandler,
};
