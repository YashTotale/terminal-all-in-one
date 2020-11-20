import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class ClearTerminal extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("clearTerminal", () => this.handler(context));
  }

  handler(context: ExtensionContext) {
    return commands.executeCommand("workbench.action.terminal.sendSequence", {
      text: "\u0003 clear \u000D",
    });
  }
}
