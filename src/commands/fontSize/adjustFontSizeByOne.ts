import FontSize from "./index";
import { ExtensionContext } from "vscode";

export default class AdjustFontSizeByOne extends FontSize {
  constructor(context: ExtensionContext, operation: string) {
    super(`${operation}FontSize`, () => this.handler(context, operation));
  }

  handler(context: ExtensionContext, operation: string) {
    const currentSize = this.getFontSizeConfig();
    const newSize = currentSize - (operation === "increase" ? -1 : 1);
    this.updateFontSizeConfig(newSize);
    this.showFontSizeSelectedMessage(`${newSize}-pt`, () =>
      this.updateFontSizeConfig(currentSize)
    );
  }
}
