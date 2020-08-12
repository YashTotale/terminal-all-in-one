import FontSize from "./index";
import { ExtensionContext } from "vscode";

export default class DecreaseFontSize extends FontSize {
  constructor(context: ExtensionContext) {
    super("decreaseFontSize", () => DecreaseFontSize.handler(context));
  }

  static async handler(context: ExtensionContext) {
    const currentSize = DecreaseFontSize.getFontSizeConfig();
    const newSize = currentSize - 1;
    await DecreaseFontSize.updateFontSizeConfig(newSize);
    DecreaseFontSize.showFontSizeSelectedMessage(`${newSize}-pt`);
  }
}
