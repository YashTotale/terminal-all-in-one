import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class CreateNewTerminal extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("createNewTerminal", () => CreateNewTerminal.handler(context));
  }

  static handler(context: ExtensionContext) {
    commands.executeCommand("workbench.action.terminal.new");
  }
}
