import {
  QuickPickItem,
  ExtensionContext,
  ConfigurationChangeEvent,
} from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "./baseCommand";
import ChangeFontSize from "./fontSize/changeFontSize";

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

export default class ChooseTerminalTheme extends BaseCommand {
  constructor(context: ExtensionContext) {
    super(
      "chooseTerminalTheme",
      () => ChooseTerminalTheme.handler(context),
      ChooseTerminalTheme.configChange
    );
  }

  static handler(context: ExtensionContext) {
    const currentColors = ChooseTerminalTheme.getColorCustomizations();
    const currentTheme = ChooseTerminalTheme.getThemeConfig();
    const themeNames = themes.map(({ name }: theme) => ({
      label: name,
      description: currentTheme === name ? "current" : null,
    }));
    ChooseTerminalTheme.showMessage("themeQuickPickOpened");
    ChooseTerminalTheme.showQuickPick(
      themeNames,
      {
        placeHolder: "Choose a Terminal Theme",
        onDidSelectItem: debounce(async (theme: QuickPickItem) => {
          ChooseTerminalTheme.updateTerminalTheme(theme.label);
        }, 300),
      },
      ({ label }) => {
        ChooseTerminalTheme.showMessage("themeSelected", label);
        ChooseTerminalTheme.updateThemeConfig(label);
      },
      () => {
        ChooseTerminalTheme.updateColorCustomizations(currentColors);
      }
    );
  }

  static configChange(event: ConfigurationChangeEvent) {
    if (
      event.affectsConfiguration(
        `${ChangeFontSize.getExtensionName()}.terminalTheme`
      )
    ) {
      return ChooseTerminalTheme.updateTerminalTheme(
        ChooseTerminalTheme.getThemeConfig()
      );
    }
  }

  static updateTerminalTheme(themeName: string) {
    //Check if theme exists and set the index of it
    let themeIndex = 0;
    const themeExists = themes.some(({ name }: theme, i: number) => {
      if (name === themeName) {
        themeIndex = i;
        return true;
      }
      return false;
    });
    if (!themeExists) {
      //If the theme doesn't exist, show an error message
      return ChooseTerminalTheme.showMessage("themeDoesNotExist");
    }
    const currentColors = ChooseTerminalTheme.getColorCustomizations();
    if (themeName === "None") {
      //Remove all the terminal styles
      return ChooseTerminalTheme.updateColorCustomizations(
        ChooseTerminalTheme.getNonTerminalStyles(currentColors)
      );
    }
    //If the theme does exist and is not None, set the new colors
    const themeScheme = { ...currentColors, ...themeSchemes[themeIndex] };
    return ChooseTerminalTheme.updateColorCustomizations(themeScheme);
  }

  static getNonTerminalStyles(allStyles: object) {
    return Object.keys(allStyles).reduce((nonTerminalStyles, currentStyle) => {
      if (!currentStyle.includes("terminal")) {
        //@ts-expect-error
        nonTerminalStyles[currentStyle] = allStyles[currentStyle];
      }
      return nonTerminalStyles;
    }, {});
  }

  static getColorCustomizations() {
    return ChooseTerminalTheme.getConfig("workbench.colorCustomizations");
  }

  static updateColorCustomizations(value: colors | {}) {
    return ChooseTerminalTheme.updateConfig({
      key: "workbench.colorCustomizations",
      value,
    });
  }

  static getThemeConfig() {
    return ChooseTerminalTheme.getExtensionConfig("terminalTheme");
  }

  static updateThemeConfig(value: string) {
    return ChooseTerminalTheme.updateExtensionConfig({
      key: "terminalTheme",
      value,
    });
  }
}
