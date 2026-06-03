import { ExtensionContext } from "vscode";

import BaseCommand from "./baseCommand";

interface FontWeightItem {
  label: string;
  description?: string;
}

const SECTION = "terminal.integrated.fontWeight";

export default class ChangeFontWeight extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeFontWeight", () => this.handler());
  }

  handler() {
    const currentWeight = this.getConfig(SECTION) as string;
    return this.livePreview<FontWeightItem>({
      section: SECTION,
      items: this.createFontWeights(currentWeight),
      toValue: (item) => item.label,
      options: { placeHolder: "Choose a Font Weight" },
    });
  }

  createFontWeights(currentWeight: string): FontWeightItem[] {
    const weights = [
      "normal",
      "bold",
      ...Array.from({ length: 9 }, (_, i) => String((i + 1) * 100)),
    ];
    return weights.map((weight) => ({
      label: weight,
      description: currentWeight === weight ? "current" : undefined,
    }));
  }
}
