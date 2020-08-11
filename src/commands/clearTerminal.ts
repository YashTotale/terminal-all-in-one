import { commands } from "vscode";
import BaseCommand from "./baseCommand";

export default class ClearTerminal extends BaseCommand {
  constructor() {
    super("clearTerminal", ClearTerminal.handler);
  }

  static handler() {
    return commands.executeCommand("workbench.action.terminal.sendSequence", {
      text: "\u0003 clear \u000D",
    });
  }
}
