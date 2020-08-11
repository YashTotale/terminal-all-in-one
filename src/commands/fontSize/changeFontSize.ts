import debounce from "lodash.debounce";
import { QuickPickItem } from "vscode";

import FontSize from "./index";

interface fontSizeObject {
  label: string;
  description: string | undefined;
}

export default class ChangeFontSize extends FontSize {
  constructor() {
    super("changeFontSize", ChangeFontSize.handler);
  }

  static handler() {
    const currentSize = ChangeFontSize.getFontSizeConfig();
    const fontSizes = ChangeFontSize.createFontSizes(currentSize);
    ChangeFontSize.showMessage("fontSizeQuickPickOpened");
    return ChangeFontSize.showQuickPick(
      fontSizes,
      {
        onDidSelectItem: debounce(async (fontSize: QuickPickItem) => {
          const trueSize = ChangeFontSize.getTrueSize(fontSize.label);
          return ChangeFontSize.updateFontSizeConfig(trueSize);
        }, 300),
      },
      (selectedSize) =>
        ChangeFontSize.showFontSizeSelectedMessage(selectedSize.label),
      () => ChangeFontSize.updateFontSizeConfig(currentSize)
    );
  }

  static createFontSizes(currentSize: number): fontSizeObject[] {
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
