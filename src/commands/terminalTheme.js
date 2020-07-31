const vscode = require("vscode");
const debounce = require("lodash.debounce");

const { showMessage } = require("../messages");
const { getConfig, updateConfig } = require("./index");

const COLORS_CONFIG = "workbench.colorCustomizations";
const TERMINAL_THEME_CONFIG = "terminalAllInOne.terminalTheme";

// @ts-ignore
const themes = require("../themes.json");
const themeNames = themes.map((theme) => theme.name);
const themeSchemes = themes.map((theme) => theme.colors);

function getNonTerminalStyles(allStyles) {
  return Object.keys(allStyles).reduce((nonTerminalStyles, currentStyle) => {
    if (!currentStyle.includes("terminal")) {
      nonTerminalStyles[currentStyle] = allStyles[currentStyle];
    }
    return nonTerminalStyles;
  }, {});
}

function onTerminalThemeConfigChange(event) {
  if (event.affectsConfiguration(TERMINAL_THEME_CONFIG)) {
    return updateTerminalTheme(getConfig().get(TERMINAL_THEME_CONFIG));
  }
}

async function updateTerminalTheme(themeName) {
  const defaultStyles = getConfig().get(COLORS_CONFIG);
  //Check if theme exists and set the index of it
  let themeIndex = 0;
  const themeExists = themeNames.some((name, i) => {
    if (name === themeName) {
      themeIndex = i;
      return true;
    }
    return false;
  });
  if (!themeExists) {
    //If the theme doesn't exist, show an error message
    return showMessage("themeDoesNotExist");
  }
  if (themeName !== "None") {
    //If the theme does exist and is not None, set the new colors
    const themeScheme = { ...defaultStyles, ...themeSchemes[themeIndex] };
    return updateConfig(COLORS_CONFIG, themeScheme);
  }
  //Remove all the terminal styles
  return updateConfig(COLORS_CONFIG, getNonTerminalStyles(defaultStyles));
}

async function chooseTerminalTheme(context) {
  //The current workbench styles
  const defaultStyles = getConfig().get(COLORS_CONFIG);
  showMessage("themeQuickPickOpened", context);
  //Wait for the user to select a theme or exit the quick pick
  let selectedTheme = await vscode.window.showQuickPick(themeNames, {
    placeHolder: "Choose a Terminal Theme",
    canPickMany: false,
    ignoreFocusOut: true,
    onDidSelectItem: debounce(async (themeName) => {
      updateTerminalTheme(themeName);
    }, 300),
  });
  if (!selectedTheme) {
    //If no theme was selected, revert to the old config
    return updateConfig(COLORS_CONFIG, defaultStyles);
  }
  //If a theme was selected, show a message and update the TERMINAL_THEME_CONFIG
  showMessage("themeSelected", { selectedTheme, context });
  return updateConfig(TERMINAL_THEME_CONFIG, selectedTheme);
}

module.exports = {
  chooseTerminalTheme,
  onTerminalThemeConfigChange,
};
