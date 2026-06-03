import { ExtensionContext } from "vscode";

import FontSize from "./index";
import { inspectScope, writeScoped } from "../../helpers/config";

export default class AdjustFontSizeByOne extends FontSize {
  constructor(context: ExtensionContext, operation: string) {
    super(`${operation}FontSize`, () => this.handler(operation));
  }

  handler(operation: string) {
    const currentSize = this.getFontSizeConfig();
    const newSize = currentSize + (operation === "increase" ? 1 : -1);
    const { target } = inspectScope(this.section);
    writeScoped(this.section, newSize, target);
  }
}
