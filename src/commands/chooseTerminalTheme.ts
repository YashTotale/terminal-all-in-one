import {
  QuickPickItem,
  ExtensionContext,
  ConfigurationChangeEvent,
} from "vscode";
import debounce from "lodash.debounce";

import BaseCommand from "./baseCommand";

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

import themes from "../themes.json";
const themeSchemes = themes.map((theme: theme) => theme.colors);

export default class ChooseTerminalTheme extends BaseCommand {
  constructor(context: ExtensionContext) {
    super(
      "chooseTerminalTheme",
      () => this.handler(context),
      (e) => this.configChange(e)
    );
  }

  handler(context: ExtensionContext) {
    const currentColors = this.getColorCustomizations();
    const currentTheme = this.getThemeConfig();
    const themeNames = themes.map(({ name }: theme) => ({
      label: name,
      description: currentTheme === name ? "current" : undefined,
    }));
    this.showMessage("themeQuickPickOpened");
    this.showQuickPick(
      themeNames,
      {
        placeHolder: "Choose a Terminal Theme",
        onDidSelectItem: debounce(async (theme: QuickPickItem) => {
          this.updateTerminalTheme(theme.label);
        }, 300),
      },
      ({ label }) => {
        this.showMessage("themeSelected", label);
        this.updateThemeConfig(label);
      },
      () => {
        this.updateColorCustomizations(currentColors);
      }
    );
  }

  configChange(event: ConfigurationChangeEvent) {
    if (
      event.affectsConfiguration(`${this.getExtensionName()}.terminalTheme`)
    ) {
      return this.updateTerminalTheme(this.getThemeConfig());
    }
  }

  updateTerminalTheme(themeName: string) {
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
      return this.showMessage("themeDoesNotExist");
    }
    const currentColors = this.getColorCustomizations();
    if (themeName === "None") {
      //Remove all the terminal styles
      return this.updateColorCustomizations(
        this.getNonTerminalStyles(currentColors)
      );
    }
    //If the theme does exist and is not None, set the new colors
    const themeScheme = { ...currentColors, ...themeSchemes[themeIndex] };
    return this.updateColorCustomizations(themeScheme);
  }

  getNonTerminalStyles(allStyles: object) {
    return Object.keys(allStyles).reduce((nonTerminalStyles, currentStyle) => {
      if (!currentStyle.includes("terminal")) {
        nonTerminalStyles[currentStyle] = allStyles[currentStyle];
      }
      return nonTerminalStyles;
    }, {});
  }

  getColorCustomizations() {
    return this.getConfig("workbench.colorCustomizations");
  }

  updateColorCustomizations(value: colors | {}) {
    return this.updateConfig({
      key: "workbench.colorCustomizations",
      value,
    });
  }

  getThemeConfig() {
    return this.getExtensionConfig("terminalTheme");
  }

  updateThemeConfig(value: string) {
    return this.updateExtensionConfig({
      key: "terminalTheme",
      value,
    });
  }
}
