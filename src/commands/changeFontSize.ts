import { commands, window, QuickPickItem } from "vscode";
//@ts-ignore
import debounce from "lodash.debounce";

import showMessage from "../messages";
import { getConfig, updateConfig } from "../helpers/config";

const FONT_SIZE_CONFIG = "terminal.integrated.fontSize";

const getFontSizeConfig = () => {
  return getConfig({ section: FONT_SIZE_CONFIG });
};

const updateFontSizeConfig = async (newSize: number) => {
  await updateConfig({ section: FONT_SIZE_CONFIG, value: newSize });
  clearTerminal();
};

const clearTerminal = () => {
  return commands.executeCommand("terminalAllInOne.clearTerminal");
};

const decreaseFontSizeHandler = async () => {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize - 1);
};

const increaseFontSizeHandler = async () => {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize + 1);
};

const createFontSizes = (currentSize: number) => {
  let fontSizes = [];
  for (let i = 8; i < 27; i++) {
    fontSizes.push({
      label: `${i}-pt`,
      description: currentSize === i ? "current" : undefined,
    });
  }
  return fontSizes;
};

interface fontSizeObject {
  label: string;
  description?: string;
}

const getTrueSize = (fontSizeObject: fontSizeObject) => {
  return parseInt(fontSizeObject.label.slice(0, -3));
};

const changeFontSizeHandler = async () => {
  const currentSize = getFontSizeConfig();
  const fontSizes = createFontSizes(currentSize);
  showMessage("fontSizeQuickPickOpened");
  const selectedSize = await window.showQuickPick(fontSizes, {
    placeHolder: "Change the Font Size",
    canPickMany: false,
    onDidSelectItem: debounce(async (fontSize: QuickPickItem) => {
      const trueSize = getTrueSize(fontSize);
      return updateFontSizeConfig(trueSize);
    }, 300),
  });
  if (!selectedSize) {
    return updateFontSizeConfig(currentSize);
  }
  showMessage("fontSizeSelected", selectedSize.label);
};

export const changeFontSize = {
  name: "changeFontSize",
  handler: changeFontSizeHandler,
};

export const decreaseFontSize = {
  name: "decreaseFontSize",
  handler: decreaseFontSizeHandler,
};

export const increaseFontSize = {
  name: "increaseFontSize",
  handler: increaseFontSizeHandler,
};
