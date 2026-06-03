import { ExtensionContext } from "vscode";

import BaseCommand from "../baseCommand";

interface CursorWidthItem {
  label: string;
  description?: string;
}

const SECTION = "terminal.integrated.cursorWidth";

export default class ChangeCursorWidth extends BaseCommand {
  constructor(context: ExtensionContext) {
    super("changeCursorWidth", () => this.handler());
  }

  handler() {
    const currentWidth = this.getConfig(SECTION) as number;
    return this.livePreview<CursorWidthItem>({
      section: SECTION,
      items: this.createCursorWidths(currentWidth),
      toValue: (item) => parseInt(item.label.slice(0, -3)),
      options: { placeHolder: "Choose a Cursor Width" },
    });
  }

  createCursorWidths(currentWidth: number): CursorWidthItem[] {
    const widths = Array.from({ length: 8 }, (_, i) => i + 1);
    return widths.map((width) => ({
      label: `${width}-pt`,
      description: currentWidth === width ? "current" : undefined,
    }));
  }
}
