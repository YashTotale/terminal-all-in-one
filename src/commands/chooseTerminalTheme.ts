import { QuickPickItem, window, ConfigurationChangeEvent } from "vscode";

import {
  getConfig,
  updateConfig,
  inspectScope,
  writeScoped,
} from "../helpers/config";
import { EXTENSION_NAME } from "../helpers/constants";
import debounce from "../helpers/debounce";
import { showThemeDoesNotExist } from "../messages";
import themes from "../themes.json";

interface theme {
  colors: Record<string, string>;
  name: string;
}

const themeSchemes = themes.map((t: theme) => t.colors);
const COLOR_CUSTOMIZATIONS = "workbench.colorCustomizations";
const THEME_SECTION = "terminalTheme";

export async function chooseTerminalTheme() {
  const currentTheme = getConfig({
    config: EXTENSION_NAME,
    section: THEME_SECTION,
  });
  const items: QuickPickItem[] = themes.map(({ name }: theme) => ({
    label: name,
    description: currentTheme === name ? "current" : undefined,
  }));

  const original = inspectScope(COLOR_CUSTOMIZATIONS);
  let previewWrite: Promise<unknown> = Promise.resolve();
  const preview = debounce((item: QuickPickItem) => {
    previewWrite = Promise.resolve(applyTheme(item.label));
  }, 300);

  let picked: QuickPickItem | undefined;
  try {
    picked = await window.showQuickPick(items, {
      matchOnDescription: true,
      placeHolder: "Choose a Terminal Theme",
      onDidSelectItem: (item) => preview(item as QuickPickItem),
    });
  } finally {
    // Stop new previews and let any in-flight preview settle before finalizing, so a late preview can't clobber the accepted theme or the restore.
    preview.cancel();
    await previewWrite;
    if (picked) {
      // Persist the theme name; the configChange listener applies its colors at the correct scope.
      updateConfig({
        config: EXTENSION_NAME,
        section: THEME_SECTION,
        value: picked.label,
      });
    } else {
      await writeScoped(COLOR_CUSTOMIZATIONS, original.value, original.target);
    }
  }
}

export function onTerminalThemeChange(event: ConfigurationChangeEvent) {
  if (event.affectsConfiguration(`${EXTENSION_NAME}.${THEME_SECTION}`)) {
    applyTheme(getConfig({ config: EXTENSION_NAME, section: THEME_SECTION }));
  }
}

// Merge the theme's terminal colors onto the user's existing colorCustomizations, written at that setting's real scope. "None" strips terminal colors.
function applyTheme(themeName: string) {
  const themeIndex = themes.findIndex((t: theme) => t.name === themeName);
  if (themeIndex === -1) {
    return showThemeDoesNotExist();
  }
  const scope = inspectScope(COLOR_CUSTOMIZATIONS);
  const current = (scope.value as Record<string, string>) ?? {};
  if (themeName === "None") {
    return writeScoped(
      COLOR_CUSTOMIZATIONS,
      getNonTerminalStyles(current),
      scope.target,
    );
  }
  return writeScoped(
    COLOR_CUSTOMIZATIONS,
    { ...current, ...themeSchemes[themeIndex] },
    scope.target,
  );
}

function getNonTerminalStyles(allStyles: Record<string, string>) {
  const nonTerminal: Record<string, string> = {};
  for (const key of Object.keys(allStyles)) {
    if (!key.includes("terminal")) nonTerminal[key] = allStyles[key];
  }
  return nonTerminal;
}
