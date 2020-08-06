const { getConfig, updateConfig } = require("../helpers/config");

const FONT_SIZE_CONFIG = "terminal.integrated.fontSize";

const getFontSizeConfig = function () {
  return getConfig({ section: FONT_SIZE_CONFIG });
};

const updateFontSizeConfig = function (newSize) {
  return updateConfig({ section: FONT_SIZE_CONFIG, value: newSize });
};

const decreaseFontSize = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize - 1);
};

const increaseFontSize = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize + 1);
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
];
