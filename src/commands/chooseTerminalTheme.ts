import { window, QuickPickItem, ConfigurationChangeEvent } from "vscode";
// @ts-expect-error
import debounce from "lodash.debounce";

import showMessage from "../messages";
import { getConfig, updateConfig } from "../helpers/config";

const COLORS_CONFIG = "workbench.colorCustomizations";
const TERMINAL_THEME_CONFIG = "terminalAllInOne.terminalTheme";

interface theme {
  colors: object;
  name: string;
}

interface colors {
  "terminal.background": string;
  "terminal.foreground": string;
  "terminalCursor.background": string;
  "terminalCursor.foreground": string;
  "terminal.ansiBlack": string;
  "terminal.ansiBlue": string;
  "terminal.ansiBrightBlack": string;
  "terminal.ansiBrightBlue": string;
  "terminal.ansiBrightCyan": string;
  "terminal.ansiBrightGreen": string;
  "terminal.ansiBrightMagenta": string;
  "terminal.ansiBrightRed": string;
  "terminal.ansiBrightWhite": string;
  "terminal.ansiBrightYellow": string;
  "terminal.ansiCyan": string;
  "terminal.ansiGreen": string;
  "terminal.ansiMagenta": string;
  "terminal.ansiRed": string;
  "terminal.ansiWhite": string;
  "terminal.ansiYellow": string;
}

const themes = require("../themes.json");
const themeSchemes = themes.map((theme: theme) => theme.colors);

const getNonTerminalStyles = (allStyles: object) => {
  return Object.keys(allStyles).reduce((nonTerminalStyles, currentStyle) => {
    if (!currentStyle.includes("terminal")) {
      //@ts-expect-error
      nonTerminalStyles[currentStyle] = allStyles[currentStyle];
    }
    return nonTerminalStyles;
  }, {});
};

const updateThemeConfig = (theme: string) => {
  return updateConfig({ section: TERMINAL_THEME_CONFIG, value: theme });
};

const getThemeConfig = () => {
  return getConfig({ section: TERMINAL_THEME_CONFIG });
};

const updateColorsConfig = (colors: colors | {}) => {
  return updateConfig({ section: COLORS_CONFIG, value: colors });
};

const getColorsConfig = () => {
  return getConfig({ section: COLORS_CONFIG });
};

const updateTerminalTheme = async (themeName: string) => {
  const themeNames = themes.map((theme: theme) => theme.name);
  //Check if theme exists and set the index of it
  let themeIndex = 0;
  const themeExists = themeNames.some((name: string, i: number) => {
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
  const currentColors = getColorsConfig();
  if (themeName === "None") {
    //Remove all the terminal styles
    return updateColorsConfig(getNonTerminalStyles(currentColors));
  }
  //If the theme does exist and is not None, set the new colors
  const themeScheme = { ...currentColors, ...themeSchemes[themeIndex] };
  return updateColorsConfig(themeScheme);
};

const chooseTerminalThemeHandler = async () => {
  const currentColors = getColorsConfig();
  const themeNames = themes.map(({ name }: theme) => ({
    label: name,
    description: getThemeConfig() === name ? "current" : null,
  }));
  showMessage("themeQuickPickOpened");
  //Wait for the user to select a theme or exit the quick pick
  const selectedTheme = await window.showQuickPick(themeNames, {
    placeHolder: "Choose a Terminal Theme",
    canPickMany: false,
    onDidSelectItem: debounce(async (theme: QuickPickItem) => {
      updateTerminalTheme(theme.label);
    }, 300),
  });
  if (!selectedTheme) {
    //If no theme was selected, revert to the old config
    return updateColorsConfig(currentColors);
  }
  //If a theme was selected, show a message and update the TERMINAL_THEME_CONFIG
  //@ts-expect-error
  showMessage("themeSelected", selectedTheme.label);
  //@ts-expect-error
  return updateThemeConfig(selectedTheme.label);
};

const onTerminalThemeConfigChange = (event: ConfigurationChangeEvent) => {
  if (event.affectsConfiguration(TERMINAL_THEME_CONFIG)) {
    return updateTerminalTheme(getThemeConfig());
  }
};

export const chooseTerminalTheme = {
  name: "chooseTerminalTheme",
  handler: chooseTerminalThemeHandler,
  config: onTerminalThemeConfigChange,
};
