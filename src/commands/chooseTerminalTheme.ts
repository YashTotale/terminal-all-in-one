import {
  QuickPickItem,
  window,
  ExtensionContext,
  ConfigurationChangeEvent,
} from "vscode";

import BaseCommand from "./baseCommand";
import { inspectScope, writeScoped } from "../helpers/config";
import debounce from "../helpers/debounce";
import { showThemeDoesNotExist } from "../messages";
import themes from "../themes.json";

interface theme {
  colors: Record<string, string>;
  name: string;
}

const themeSchemes = themes.map((t: theme) => t.colors);
const COLOR_CUSTOMIZATIONS = "workbench.colorCustomizations";

export default class ChooseTerminalTheme extends BaseCommand {
  constructor(context: ExtensionContext) {
    super(
      "chooseTerminalTheme",
      () => this.handler(),
      (e) => this.configChange(e),
    );
  }

  async handler() {
    const currentTheme = this.getThemeConfig();
    const items: QuickPickItem[] = themes.map(({ name }: theme) => ({
      label: name,
      description: currentTheme === name ? "current" : undefined,
    }));

    const original = inspectScope(COLOR_CUSTOMIZATIONS);
    const preview = debounce((item: QuickPickItem) => {
      this.applyTheme(item.label);
    }, 300);

    let picked: QuickPickItem | undefined;
    try {
      picked = await window.showQuickPick(items, {
        matchOnDescription: true,
        placeHolder: "Choose a Terminal Theme",
        onDidSelectItem: (item) => preview(item as QuickPickItem),
      });
      if (picked) {
        // Persist the theme name; the configChange listener applies its colors at the correct scope.
        this.updateThemeConfig(picked.label);
      }
    } finally {
      preview.cancel();
      if (!picked) {
        await writeScoped(
          COLOR_CUSTOMIZATIONS,
          original.value,
          original.target,
        );
      }
    }
  }

  configChange(event: ConfigurationChangeEvent) {
    if (
      event.affectsConfiguration(`${this.getExtensionName()}.terminalTheme`)
    ) {
      this.applyTheme(this.getThemeConfig());
    }
  }

  // Merge the theme's terminal colors onto the user's existing colorCustomizations, written at that setting's real scope. "None" strips terminal colors.
  applyTheme(themeName: string) {
    const themeIndex = themes.findIndex((t: theme) => t.name === themeName);
    if (themeIndex === -1) {
      return showThemeDoesNotExist();
    }
    const scope = inspectScope(COLOR_CUSTOMIZATIONS);
    const current = (scope.value as Record<string, string>) ?? {};
    if (themeName === "None") {
      return writeScoped(
        COLOR_CUSTOMIZATIONS,
        this.getNonTerminalStyles(current),
        scope.target,
      );
    }
    return writeScoped(
      COLOR_CUSTOMIZATIONS,
      { ...current, ...themeSchemes[themeIndex] },
      scope.target,
    );
  }

  getNonTerminalStyles(allStyles: Record<string, string>) {
    const nonTerminal: Record<string, string> = {};
    for (const key of Object.keys(allStyles)) {
      if (!key.includes("terminal")) nonTerminal[key] = allStyles[key];
    }
    return nonTerminal;
  }

  getThemeConfig(): string {
    return this.getExtensionConfig("terminalTheme");
  }

  updateThemeConfig(value: string) {
    return this.updateExtensionConfig({ key: "terminalTheme", value });
  }
}
