import vscode from "vscode";
import debounce from "lodash.debounce";

import showMessage from "../messages";
import { getConfig, updateConfig } from "../helpers/config";

const FONT_SIZE_CONFIG = "terminal.integrated.fontSize";

const getFontSizeConfig = function () {
  return getConfig({ section: FONT_SIZE_CONFIG });
};

const updateFontSizeConfig = async function (newSize) {
  await updateConfig({ section: FONT_SIZE_CONFIG, value: newSize });
  clearTerminal();
};

const clearTerminal = function () {
  return vscode.commands.executeCommand("terminalAllInOne.clearTerminal");
};

const decreaseFontSizeHandler = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize - 1);
};

const increaseFontSizeHandler = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize + 1);
};

const createFontSizes = function (currentSize) {
  let fontSizes = [];
  for (let i = 8; i < 27; i++) {
    fontSizes.push({
      label: `${i}-pt`,
      description: currentSize === i ? "current" : null,
    });
  }
  return fontSizes;
};

const getTrueSize = function (fontSizeObject) {
  return parseInt(fontSizeObject.label.slice(0, -3));
};

const changeFontSizeHandler = async function () {
  const currentSize = getFontSizeConfig();
  const fontSizes = createFontSizes(currentSize);
  showMessage("fontSizeQuickPickOpened");
  const selectedSize = await vscode.window.showQuickPick(fontSizes, {
    placeHolder: "Change the Font Size",
    canPickMany: false,
    onDidSelectItem: debounce(async function (fontSize) {
      const trueSize = getTrueSize(fontSize);
      return updateFontSizeConfig(trueSize);
    }, 300),
  });
  if (!selectedSize) {
    return updateFontSizeConfig(currentSize);
  }
  showMessage("fontSizeSelected", selectedSize.label);
};

// export default [
//
//   ,
//   {
//     name: "changeFontSize",
//     handler: changeFontSize,
//   },
// ];

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
