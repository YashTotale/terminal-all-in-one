import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class ToggleMaxTerm extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("toggleMaxTerm", ToggleMaxTerm.handler);
  }

  static handler() {
    commands.executeCommand("workbench.action.terminal.focus");
    commands.executeCommand("workbench.action.toggleMaximizedPanel");
  }
}
