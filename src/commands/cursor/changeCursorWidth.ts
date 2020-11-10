import { QuickPickItem, ExtensionContext } from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "../baseCommand";

interface CursorWidthObject {
  label: string;
  description: string | undefined;
}

export default class ChangeCursorWidth extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeCursorWidth", () => ChangeCursorWidth.handler(context));
  }

  static getCursorWidthConfig(): number {
    return ChangeCursorWidth.getConfig("terminal.integrated.cursorWidth");
  }

  static updateCursorWidthConfig(value: number) {
    ChangeCursorWidth.updateConfig({
      key: "terminal.integrated.cursorWidth",
      value,
    });
  }

  static handler(context: ExtensionContext) {
    const currentWidth = ChangeCursorWidth.getCursorWidthConfig();
    const cursorWidths = ChangeCursorWidth.createCursorWidths(currentWidth);
    ChangeCursorWidth.showMessage(
      "cursorWidthQuickPickOpened",
      ChangeCursorWidth.focusTerminal
    );
    return ChangeCursorWidth.showQuickPick(
      cursorWidths,
      {
        placeHolder: "Choose a Cursor Width",
        onDidSelectItem: debounce(async (cursorWidth: QuickPickItem) => {
          const trueSize = ChangeCursorWidth.getTrueWidth(cursorWidth.label);
          return ChangeCursorWidth.updateCursorWidthConfig(trueSize);
        }, 300),
      },
      (selectedWidth) =>
        ChangeCursorWidth.showCursorWidthSelectedMessage(
          selectedWidth.label,
          () => ChangeCursorWidth.updateCursorWidthConfig(currentWidth)
        ),
      () => ChangeCursorWidth.updateCursorWidthConfig(currentWidth)
    );
  }

  static createCursorWidths(currentWidth: number): CursorWidthObject[] {
    let cursorWidths = [];
    for (let i = 1; i < 9; i++) {
      cursorWidths.push({
        label: `${i}-pt`,
        description: currentWidth === i ? "current" : undefined,
      });
    }
    return cursorWidths;
  }

  static getTrueWidth(cursorWidthStr: string): number {
    return parseInt(cursorWidthStr.slice(0, -3));
  }

  static showCursorWidthSelectedMessage(cursorWidth: string, undo: () => any) {
    ChangeCursorWidth.showMessage("cursorWidthSelected", cursorWidth, undo);
  }
}
