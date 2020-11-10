import BaseCommand from "../baseCommand";

export default class FontSize extends BaseCommand {
  static getFontSizeConfig(): number {
    return FontSize.getConfig("terminal.integrated.fontSize");
  }

  static updateFontSizeConfig(value: number) {
    FontSize.updateConfig({
      key: "terminal.integrated.fontSize",
      value,
    });
    FontSize.clearTerminal();
  }

  static showFontSizeSelectedMessage(fontSize: string, undo: () => any) {
    return FontSize.showMessage("fontSizeSelected", fontSize, undo);
  }
}
