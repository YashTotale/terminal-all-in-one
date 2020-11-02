import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class SelectDefaultShell extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("selectDefaultShell", () => SelectDefaultShell.handler(context));
  }

  static handler(context: ExtensionContext) {
    commands.executeCommand("workbench.action.terminal.selectDefaultShell");
  }
}
