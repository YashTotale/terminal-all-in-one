import { QuickPickItem, ExtensionContext } from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "./baseCommand";

export default class ChangeFontWeight extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeFontWeight", () => this.handler(context));
  }

  getFontWeightConfig(): string {
    return this.getConfig("terminal.integrated.fontWeight");
  }

  updateFontWeightConfig(value: string) {
    this.updateConfig({
      key: "terminal.integrated.fontWeight",
      value,
    });
  }

  handler(context: ExtensionContext) {
    const currentWeight = this.getFontWeightConfig();
    const fontWeights = this.createFontWeights(currentWeight);
    this.showMessage("fontWeightQuickPickOpened", this.focusTerminal);
    return this.showQuickPick(
      fontWeights,
      {
        placeHolder: "Choose a Font Weight",
        onDidSelectItem: debounce(async (fontWeight: QuickPickItem) => {
          return this.updateFontWeightConfig(fontWeight.label);
        }, 300),
      },
      (selectedWeight) =>
        this.showFontWeightSelectedMessage(selectedWeight.label, () =>
          this.updateFontWeightConfig(currentWeight)
        ),
      () => this.updateFontWeightConfig(currentWeight)
    );
  }

  createFontWeights(currentWeight: string) {
    let fontWeights = [];
    ["normal", "bold"].forEach((val) =>
      fontWeights.push({
        label: val,
        description: currentWeight === val ? "current" : undefined,
      })
    );
    for (let i = 100; i <= 900; i += 100) {
      const weight = JSON.stringify(i);
      fontWeights.push({
        label: weight,
        description: currentWeight === weight ? "current" : undefined,
      });
    }
    return fontWeights;
  }

  showFontWeightSelectedMessage(fontWeight: string, undo: () => any) {
    this.showMessage("fontWeightSelected", fontWeight, undo);
  }
}
