import { ExtensionContext } from "vscode";

import BaseCommand from "../baseCommand";
import { inspectScope, writeScoped } from "../../helpers/config";

const SECTION = "terminal.integrated.cursorBlinking";

export default class ToggleBlinkingCursor extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("toggleBlinkingCursor", () => this.handler());
  }

  handler() {
    const isBlinking = this.getConfig(SECTION) as boolean;
    const { target } = inspectScope(SECTION);
    writeScoped(SECTION, !isBlinking, target);
  }
}
