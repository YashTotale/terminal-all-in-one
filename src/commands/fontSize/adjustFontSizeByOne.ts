import FontSize from "./index";
import { ExtensionContext } from "vscode";

export default class AdjustFontSizeByOne extends FontSize {
  constructor(context: ExtensionContext, operation: string) {
    super(`${operation}FontSize`, () =>
      AdjustFontSizeByOne.handler(context, operation)
    );
  }

  static async handler(context: ExtensionContext, operation: string) {
    const currentSize = AdjustFontSizeByOne.getFontSizeConfig();
    const newSize = currentSize - (operation === "increase" ? -1 : 1);
    await AdjustFontSizeByOne.updateFontSizeConfig(newSize);
    AdjustFontSizeByOne.showFontSizeSelectedMessage(`${newSize}-pt`);
  }
}
