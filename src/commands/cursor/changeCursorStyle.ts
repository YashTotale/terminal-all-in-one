import { ExtensionContext } from "vscode";

import BaseCommand from "../baseCommand";

type CursorStyle = "line" | "block" | "underline";

interface CursorStyleItem {
  label: CursorStyle;
  description?: string;
}

const SECTION = "terminal.integrated.cursorStyle";

export default class ChangeCursorStyle extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeCursorStyle", () => this.handler());
  }

  handler() {
    const currentStyle = this.getConfig(SECTION) as CursorStyle;
    return this.livePreview<CursorStyleItem>({
      section: SECTION,
      items: this.createCursorStyles(currentStyle),
      toValue: (item) => item.label,
      options: { placeHolder: "Choose a Cursor Style" },
    });
  }

  createCursorStyles(currentStyle: CursorStyle): CursorStyleItem[] {
    const cursorStyles: CursorStyle[] = ["line", "block", "underline"];
    return cursorStyles.map((style) => ({
      label: style,
      description: style === currentStyle ? "current" : undefined,
    }));
  }
}
