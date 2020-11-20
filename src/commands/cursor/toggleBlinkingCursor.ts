import { ExtensionContext } from "vscode";
import BaseCommand from "../baseCommand";

export default class ToggleBlinkingCursor extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("toggleBlinkingCursor", () => this.handler(context));
  }

  getBlinkingCursorConfig(): boolean {
    return this.getConfig("terminal.integrated.cursorBlinking");
  }

  updateBlinkingCursorConfig(value: boolean) {
    this.updateConfig({
      key: "terminal.integrated.cursorBlinking",
      value,
    });
  }

  handler(context: ExtensionContext) {
    const isBlinking = this.getBlinkingCursorConfig();
    this.updateBlinkingCursorConfig(!isBlinking);
    this.showMessage("blinkingCursorToggled", !isBlinking, () =>
      this.updateBlinkingCursorConfig(isBlinking)
    );
  }
}
