import FontSize from "./index";

export default class IncreaseFontSize extends FontSize {
  constructor() {
    super("increaseFontSize", IncreaseFontSize.handler);
  }

  static async handler() {
    const currentSize = IncreaseFontSize.getFontSizeConfig();
    const newSize = currentSize + 1;
    await IncreaseFontSize.updateFontSizeConfig(newSize);
    IncreaseFontSize.showFontSizeSelectedMessage(`${newSize}-pt`);
  }
}
