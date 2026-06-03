import { ExtensionContext } from "vscode";

import FontSize from "./index";

interface FontSizeItem {
  label: string;
  description?: string;
}

export default class ChangeFontSize extends FontSize {
  constructor(context: ExtensionContext) {
    super("changeFontSize", () => this.handler());
  }

  handler() {
    const currentSize = this.getFontSizeConfig();
    return this.livePreview<FontSizeItem>({
      section: this.section,
      items: this.createFontSizes(currentSize),
      toValue: (item) => parseInt(item.label.slice(0, -3)),
      options: { placeHolder: "Choose a Font Size" },
    });
  }

  createFontSizes(currentSize: number): FontSizeItem[] {
    const sizes = Array.from({ length: 19 }, (_, i) => i + 8);
    return sizes.map((size) => ({
      label: `${size}-pt`,
      description: currentSize === size ? "current" : undefined,
    }));
  }
}
