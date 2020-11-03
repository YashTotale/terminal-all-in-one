import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class DeleteCurrentTerminal extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("deleteCurrentTerminal", () =>
      DeleteCurrentTerminal.handler(context)
    );
  }

  static handler(context: ExtensionContext) {
    commands.executeCommand("workbench.action.terminal.kill");
  }
}
