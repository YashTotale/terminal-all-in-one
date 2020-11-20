import { QuickPickItem, ExtensionContext } from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "../baseCommand";

interface CursorWidthObject {
  label: string;
  description: string | undefined;
}

export default class ChangeCursorWidth extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeCursorWidth", () => this.handler(context));
  }

  getCursorWidthConfig(): number {
    return this.getConfig("terminal.integrated.cursorWidth");
  }

  updateCursorWidthConfig(value: number) {
    this.updateConfig({
      key: "terminal.integrated.cursorWidth",
      value,
    });
  }

  handler(context: ExtensionContext) {
    const currentWidth = this.getCursorWidthConfig();
    const cursorWidths = this.createCursorWidths(currentWidth);
    this.showMessage("cursorWidthQuickPickOpened", this.focusTerminal);
    return this.showQuickPick(
      cursorWidths,
      {
        placeHolder: "Choose a Cursor Width",
        onDidSelectItem: debounce(async (cursorWidth: QuickPickItem) => {
          const trueSize = this.getTrueWidth(cursorWidth.label);
          return this.updateCursorWidthConfig(trueSize);
        }, 300),
      },
      (selectedWidth) =>
        this.showCursorWidthSelectedMessage(selectedWidth.label, () =>
          this.updateCursorWidthConfig(currentWidth)
        ),
      () => this.updateCursorWidthConfig(currentWidth)
    );
  }

  createCursorWidths(currentWidth: number): CursorWidthObject[] {
    let cursorWidths = [];
    for (let i = 1; i < 9; i++) {
      cursorWidths.push({
        label: `${i}-pt`,
        description: currentWidth === i ? "current" : undefined,
      });
    }
    return cursorWidths;
  }

  getTrueWidth(cursorWidthStr: string): number {
    return parseInt(cursorWidthStr.slice(0, -3));
  }

  showCursorWidthSelectedMessage(cursorWidth: string, undo: () => any) {
    this.showMessage("cursorWidthSelected", cursorWidth, undo);
  }
}
