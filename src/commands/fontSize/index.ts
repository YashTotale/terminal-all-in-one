import BaseCommand from "../baseCommand";

export default class FontSize extends BaseCommand {
  static getFontSizeConfig(): number {
    return FontSize.getConfig("terminal.integrated.fontSize");
  }

  static async updateFontSizeConfig(value: any) {
    await FontSize.updateConfig({
      key: "terminal.integrated.fontSize",
      value,
    });
    FontSize.clearTerminal();
  }

  static showFontSizeSelectedMessage(fontSize: string) {
    return FontSize.showMessage("fontSizeSelected", fontSize);
  }
}
