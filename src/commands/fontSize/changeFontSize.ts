import debounce from "lodash.debounce";
import { QuickPickItem, ExtensionContext } from "vscode";

import FontSize from "./index";

interface FontSizeObject {
  label: string;
  description?: string;
}

export default class ChangeFontSize extends FontSize {
  constructor(context: ExtensionContext) {
    super("changeFontSize", () => this.handler(context));
  }

  handler(context: ExtensionContext) {
    const currentSize = this.getFontSizeConfig();
    const fontSizes = this.createFontSizes(currentSize);
    this.showMessage("fontSizeQuickPickOpened", this.focusTerminal);
    return this.showQuickPick(
      fontSizes,
      {
        placeHolder: "Choose a Font Size",
        onDidSelectItem: debounce(async (fontSize: QuickPickItem) => {
          const trueSize = this.getTrueSize(fontSize.label);
          return this.updateFontSizeConfig(trueSize);
        }, 300),
      },
      (selectedSize) =>
        this.showFontSizeSelectedMessage(selectedSize.label, () =>
          this.updateFontSizeConfig(currentSize)
        ),
      () => this.updateFontSizeConfig(currentSize)
    );
  }

  createFontSizes(currentSize: number): FontSizeObject[] {
    const fontSizes: FontSizeObject[] = [];
    for (let i = 8; i < 27; i++) {
      fontSizes.push({
        label: `${i}-pt`,
        description: currentSize === i ? "current" : undefined,
      });
    }
    return fontSizes;
  }

  getTrueSize(fontSizeStr: string): number {
    return parseInt(fontSizeStr.slice(0, -3));
  }
}
