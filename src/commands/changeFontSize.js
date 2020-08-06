const vscode = require("vscode");
const debounce = require("lodash.debounce");

const { showMessage } = require("../messages");
const { getConfig, updateConfig } = require("../helpers/config");

const FONT_SIZE_CONFIG = "terminal.integrated.fontSize";

const getFontSizeConfig = function () {
  return getConfig({ section: FONT_SIZE_CONFIG });
};

const updateFontSizeConfig = async function (newSize) {
  await updateConfig({ section: FONT_SIZE_CONFIG, value: newSize });
  clearTerminal();
};

const clearTerminal = function () {
  return vscode.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    {
      text: "\u000Dclear\u000D",
    }
  );
};

const decreaseFontSize = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize - 1);
};

const increaseFontSize = function () {
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

const changeFontSize = async function () {
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

module.exports = [
  {
    name: "increaseFontSize",
    handler: increaseFontSize,
  },
  {
    name: "decreaseFontSize",
    handler: decreaseFontSize,
  },
  {
    name: "changeFontSize",
    handler: changeFontSize,
  },
];
