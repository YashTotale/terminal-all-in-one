import BaseCommand from "../baseCommand";

export default class FontSize extends BaseCommand {
  section = "terminal.integrated.fontSize";

  getFontSizeConfig(): number {
    return this.getConfig(this.section);
  }
}
