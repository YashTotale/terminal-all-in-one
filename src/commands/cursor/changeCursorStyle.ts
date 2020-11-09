import { ExtensionContext } from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "../baseCommand";

type CursorStyle = "line" | "block" | "underline";

interface CursorStyleObject {
  label: CursorStyle;
  description: string | undefined;
}

export default class ChangeCursorStyle extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeCursorStyle", () => ChangeCursorStyle.handler(context));
  }

  static getCursorStyleConfig(): CursorStyle {
    return ChangeCursorStyle.getConfig("terminal.integrated.cursorStyle");
  }

  static updateCursorStyleConfig(value: CursorStyle) {
    ChangeCursorStyle.updateConfig({
      key: "terminal.integrated.cursorStyle",
      value,
    });
  }

  static handler(context: ExtensionContext) {
    const currentStyle = ChangeCursorStyle.getCursorStyleConfig();
    const cursorStyles = ChangeCursorStyle.createCursorStyles(currentStyle);
    ChangeCursorStyle.showMessage(
      "cursorStyleQuickPickOpened",
      ChangeCursorStyle.focusTerminal
    );
    return ChangeCursorStyle.showQuickPick(
      cursorStyles,
      {
        placeHolder: "Choose a Cursor Style",
        onDidSelectItem: debounce(async (cursorStyle: CursorStyleObject) => {
          return ChangeCursorStyle.updateCursorStyleConfig(cursorStyle.label);
        }, 300),
      },
      (selectedStyle) =>
        ChangeCursorStyle.showCursorStyleSelectedMessage(
          selectedStyle.label as CursorStyle,
          () => ChangeCursorStyle.updateCursorStyleConfig(currentStyle)
        ),
      () => ChangeCursorStyle.updateCursorStyleConfig(currentStyle)
    );
  }

  static createCursorStyles(currentStyle: CursorStyle): CursorStyleObject[] {
    const cursorStyles: CursorStyle[] = ["line", "block", "underline"];
    return cursorStyles.map((style) => ({
      label: style,
      description: style === currentStyle ? "current" : undefined,
    }));
  }

  static showCursorStyleSelectedMessage(
    cursorStyle: CursorStyle,
    undo: () => any
  ) {
    return ChangeCursorStyle.showMessage(
      "cursorStyleSelected",
      cursorStyle,
      undo
    );
  }
}
