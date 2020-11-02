import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class ToggleTerminal extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("toggleTerminal", () => ToggleTerminal.handler(context));
  }

  static handler(context: ExtensionContext) {
    commands.executeCommand("workbench.action.terminal.toggleTerminal");
  }
}
