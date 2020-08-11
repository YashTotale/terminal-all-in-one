import FontSize from "./index";

export default class DecreaseFontSize extends FontSize {
  constructor() {
    super("decreaseFontSize", DecreaseFontSize.handler);
  }

  static async handler() {
    const currentSize = DecreaseFontSize.getFontSizeConfig();
    const newSize = currentSize - 1;
    await DecreaseFontSize.updateFontSizeConfig(newSize);
    DecreaseFontSize.showFontSizeSelectedMessage(`${newSize}-pt`);
  }
}
