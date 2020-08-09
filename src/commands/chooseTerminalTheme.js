import vscode from "vscode";
import debounce from "lodash.debounce";

import showMessage from "../messages";
import { getConfig, updateConfig } from "../helpers/config";

const COLORS_CONFIG = "workbench.colorCustomizations";
const TERMINAL_THEME_CONFIG = "terminalAllInOne.terminalTheme";

const themes = require("../themes.json");
const themeSchemes = themes.map((theme) => theme.colors);

function getNonTerminalStyles(allStyles) {
  return Object.keys(allStyles).reduce((nonTerminalStyles, currentStyle) => {
    if (!currentStyle.includes("terminal")) {
      nonTerminalStyles[currentStyle] = allStyles[currentStyle];
    }
    return nonTerminalStyles;
  }, {});
}

function updateThemeConfig(theme) {
  return updateConfig({ section: TERMINAL_THEME_CONFIG, value: theme });
}

function getThemeConfig() {
  return getConfig({ section: TERMINAL_THEME_CONFIG });
}

function updateColorsConfig(colors) {
  return updateConfig({ section: COLORS_CONFIG, value: colors });
}

function getColorsConfig() {
  return getConfig({ section: COLORS_CONFIG });
}

async function updateTerminalTheme(themeName, themeNames) {
  //Check if theme exists and set the index of it
  let themeIndex = 0;
  const themeExists = themeNames.some(({ label }, i) => {
    if (label === themeName) {
      themeIndex = i;
      return true;
    }
    return false;
  });
  if (!themeExists) {
    //If the theme doesn't exist, show an error message
    return showMessage("themeDoesNotExist");
  }
  const currentColors = getColorsConfig();
  if (themeName === "None") {
    //Remove all the terminal styles
    return updateColorsConfig(getNonTerminalStyles(currentColors));
  }
  //If the theme does exist and is not None, set the new colors
  const themeScheme = { ...currentColors, ...themeSchemes[themeIndex] };
  return updateColorsConfig(themeScheme);
}

async function chooseTerminalThemeHandler() {
  const currentColors = getColorsConfig();
  const themeNames = themes.map(({ name }) => ({
    label: name,
    description: getThemeConfig() === name ? "current" : null,
  }));
  showMessage("themeQuickPickOpened");
  //Wait for the user to select a theme or exit the quick pick
  const selectedTheme = await vscode.window.showQuickPick(themeNames, {
    placeHolder: "Choose a Terminal Theme",
    canPickMany: false,
    onDidSelectItem: debounce(async (theme) => {
      updateTerminalTheme(theme.label, themeNames);
    }, 300),
  });
  if (!selectedTheme) {
    //If no theme was selected, revert to the old config
    return updateColorsConfig(currentColors);
  }
  //If a theme was selected, show a message and update the TERMINAL_THEME_CONFIG
  showMessage("themeSelected", selectedTheme.label);
  return updateThemeConfig(selectedTheme.label);
}

function onTerminalThemeConfigChange(event) {
  if (event.affectsConfiguration(TERMINAL_THEME_CONFIG)) {
    return updateTerminalTheme(getThemeConfig());
  }
}

export const chooseTerminalTheme = {
  name: "chooseTerminalTheme",
  handler: chooseTerminalThemeHandler,
  config: onTerminalThemeConfigChange,
};
