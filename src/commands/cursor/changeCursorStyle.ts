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
    super("changeCursorStyle", () => this.handler(context));
  }

  getCursorStyleConfig(): CursorStyle {
    return this.getConfig("terminal.integrated.cursorStyle");
  }

  updateCursorStyleConfig(value: CursorStyle) {
    this.updateConfig({
      key: "terminal.integrated.cursorStyle",
      value,
    });
  }

  handler(context: ExtensionContext) {
    const currentStyle = this.getCursorStyleConfig();
    const cursorStyles = this.createCursorStyles(currentStyle);
    this.showMessage("cursorStyleQuickPickOpened", this.focusTerminal);
    return this.showQuickPick(
      cursorStyles,
      {
        placeHolder: "Choose a Cursor Style",
        onDidSelectItem: debounce(async (cursorStyle: CursorStyleObject) => {
          return this.updateCursorStyleConfig(cursorStyle.label);
        }, 300),
      },
      (selectedStyle) =>
        this.showCursorStyleSelectedMessage(
          selectedStyle.label as CursorStyle,
          () => this.updateCursorStyleConfig(currentStyle)
        ),
      () => this.updateCursorStyleConfig(currentStyle)
    );
  }

  createCursorStyles(currentStyle: CursorStyle): CursorStyleObject[] {
    const cursorStyles: CursorStyle[] = ["line", "block", "underline"];
    return cursorStyles.map((style) => ({
      label: style,
      description: style === currentStyle ? "current" : undefined,
    }));
  }

  showCursorStyleSelectedMessage(cursorStyle: CursorStyle, undo: () => any) {
    return this.showMessage("cursorStyleSelected", cursorStyle, undo);
  }
}
