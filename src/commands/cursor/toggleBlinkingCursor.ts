import { ExtensionContext } from "vscode";
import BaseCommand from "../baseCommand";

export default class ToggleBlinkingCursor extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("toggleBlinkingCursor", () => ToggleBlinkingCursor.handler(context));
  }

  static getBlinkingCursorConfig(): boolean {
    return ToggleBlinkingCursor.getConfig("terminal.integrated.cursorBlinking");
  }

  static updateBlinkingCursorConfig(value: boolean) {
    ToggleBlinkingCursor.updateConfig({
      key: "terminal.integrated.cursorBlinking",
      value,
    });
  }

  static handler(context: ExtensionContext) {
    const isBlinking = ToggleBlinkingCursor.getBlinkingCursorConfig();
    ToggleBlinkingCursor.updateBlinkingCursorConfig(!isBlinking);
    ToggleBlinkingCursor.showMessage("blinkingCursorToggled", !isBlinking, () =>
      ToggleBlinkingCursor.updateBlinkingCursorConfig(isBlinking)
    );
  }
}
