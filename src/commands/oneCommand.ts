import { commands, ExtensionContext } from "vscode";
import BaseCommand from "./baseCommand";

export default class OneCommand extends BaseCommand {
  constructor(context: ExtensionContext, name: string, cmd: string | string[]) {
    super(name, () => this.handler(context, cmd));
  }

  handler(context: ExtensionContext, cmd: string | string[]) {
    if (Array.isArray(cmd)) {
      cmd.forEach((c) => {
        commands.executeCommand(c);
      });
    } else {
      commands.executeCommand(cmd);
    }
  }
}
