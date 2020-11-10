import { QuickPickItem, ExtensionContext } from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "./baseCommand";

export default class ChangeFontWeight extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeFontWeight", () => ChangeFontWeight.handler(context));
  }

  static getFontWeightConfig(): string {
    return ChangeFontWeight.getConfig("terminal.integrated.fontWeight");
  }

  static updateFontWeightConfig(value: string) {
    ChangeFontWeight.updateConfig({
      key: "terminal.integrated.fontWeight",
      value,
    });
  }

  static handler(context: ExtensionContext) {
    const currentWeight = ChangeFontWeight.getFontWeightConfig();
    const fontWeights = ChangeFontWeight.createFontWeights(currentWeight);
    ChangeFontWeight.showMessage(
      "fontWeightQuickPickOpened",
      ChangeFontWeight.focusTerminal
    );
    return ChangeFontWeight.showQuickPick(
      fontWeights,
      {
        placeHolder: "Choose a Font Weight",
        onDidSelectItem: debounce(async (fontWeight: QuickPickItem) => {
          return ChangeFontWeight.updateFontWeightConfig(fontWeight.label);
        }, 300),
      },
      (selectedWeight) =>
        ChangeFontWeight.showFontWeightSelectedMessage(
          selectedWeight.label,
          () => ChangeFontWeight.updateFontWeightConfig(currentWeight)
        ),
      () => ChangeFontWeight.updateFontWeightConfig(currentWeight)
    );
  }

  static createFontWeights(currentWeight: string) {
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

  static showFontWeightSelectedMessage(fontWeight: string, undo: () => any) {
    ChangeFontWeight.showMessage("fontWeightSelected", fontWeight, undo);
  }
}
