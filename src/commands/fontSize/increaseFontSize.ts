import FontSize from "./index";
import { ExtensionContext } from "vscode";

export default class IncreaseFontSize extends FontSize {
  constructor(context: ExtensionContext) {
    super("increaseFontSize", IncreaseFontSize.handler);
  }

  static async handler() {
    const currentSize = IncreaseFontSize.getFontSizeConfig();
    const newSize = currentSize + 1;
    await IncreaseFontSize.updateFontSizeConfig(newSize);
    IncreaseFontSize.showFontSizeSelectedMessage(`${newSize}-pt`);
  }
}
