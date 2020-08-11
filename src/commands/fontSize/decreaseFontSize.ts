import FontSize from "./index";
import { ExtensionContext } from "vscode";

export default class DecreaseFontSize extends FontSize {
  constructor(context: ExtensionContext) {
    super("decreaseFontSize", DecreaseFontSize.handler);
  }

  static async handler() {
    const currentSize = DecreaseFontSize.getFontSizeConfig();
    const newSize = currentSize - 1;
    await DecreaseFontSize.updateFontSizeConfig(newSize);
    DecreaseFontSize.showFontSizeSelectedMessage(`${newSize}-pt`);
  }
}
