import BaseCommand from "../baseCommand";

export default class FontSize extends BaseCommand {
  getFontSizeConfig(): number {
    return this.getConfig("terminal.integrated.fontSize");
  }

  updateFontSizeConfig(value: number) {
    this.updateConfig({
      key: "terminal.integrated.fontSize",
      value,
    });
    this.clearTerminal();
  }

  showFontSizeSelectedMessage(fontSize: string, undo: () => any) {
    return this.showMessage("fontSizeSelected", fontSize, undo);
  }
}
