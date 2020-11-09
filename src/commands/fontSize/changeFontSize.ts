import debounce from "lodash.debounce";
import { QuickPickItem, ExtensionContext } from "vscode";

import FontSize from "./index";

interface FontSizeObject {
  label: string;
  description: string | undefined;
}

export default class ChangeFontSize extends FontSize {
  constructor(context: ExtensionContext) {
    super("changeFontSize", () => ChangeFontSize.handler(context));
  }

  static handler(context: ExtensionContext) {
    const currentSize = ChangeFontSize.getFontSizeConfig();
    const fontSizes = ChangeFontSize.createFontSizes(currentSize);
    ChangeFontSize.showMessage(
      "fontSizeQuickPickOpened",
      ChangeFontSize.focusTerminal
    );
    return ChangeFontSize.showQuickPick(
      fontSizes,
      {
        placeHolder: "Choose a Font Size",
        onDidSelectItem: debounce(async (fontSize: QuickPickItem) => {
          const trueSize = ChangeFontSize.getTrueSize(fontSize.label);
          return ChangeFontSize.updateFontSizeConfig(trueSize);
        }, 300),
      },
      (selectedSize) =>
        ChangeFontSize.showFontSizeSelectedMessage(selectedSize.label, () =>
          ChangeFontSize.updateFontSizeConfig(currentSize)
        ),
      () => ChangeFontSize.updateFontSizeConfig(currentSize)
    );
  }

  static createFontSizes(currentSize: number): FontSizeObject[] {
    let fontSizes = [];
    for (let i = 8; i < 27; i++) {
      fontSizes.push({
        label: `${i}-pt`,
        description: currentSize === i ? "current" : undefined,
      });
    }
    return fontSizes;
  }

  static getTrueSize(fontSizeStr: string): number {
    return parseInt(fontSizeStr.slice(0, -3));
  }
}
