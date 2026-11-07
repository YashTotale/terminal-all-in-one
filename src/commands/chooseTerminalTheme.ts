import {
  QuickPickItem,
  window,
  ConfigurationChangeEvent,
  ConfigurationTarget,
} from "vscode";

import { configuration, getConfig, writeScoped } from "../helpers/config";
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
const THEME_SECTION = `${EXTENSION_NAME}.terminalTheme`;

function getThemeTarget() {
  return configuration().inspect(THEME_SECTION)?.workspaceValue !== undefined
    ? ConfigurationTarget.Workspace
    : ConfigurationTarget.Global;
}

function getThemeColors(target: ConfigurationTarget) {
  const colors =
    configuration().inspect<Record<string, string>>(COLOR_CUSTOMIZATIONS);
  return target === ConfigurationTarget.Workspace
    ? colors?.workspaceValue
    : colors?.globalValue;
}

export async function chooseTerminalTheme() {
  const currentTheme = getConfig({ section: THEME_SECTION });
  const items: QuickPickItem[] = themes.map(({ name }: theme) => ({
    label: name,
    description: currentTheme === name ? "current" : undefined,
  }));

  const target = getThemeTarget();
  const original = getThemeColors(target);
  let previewWrite: Promise<unknown> = Promise.resolve();
  const preview = debounce((item: QuickPickItem) => {
    previewWrite = Promise.resolve(applyTheme(item.label, target));
  }, 300);

  let picked: QuickPickItem | undefined;
  try {
    picked = await window.showQuickPick(items, {
      matchOnDescription: true,
      placeHolder: "Choose a Terminal Theme",
      onDidSelectItem: (item) => preview(item as QuickPickItem),
    });
  } finally {
    // Finish any pending preview before accepting or restoring the colors.
    preview.cancel();
    await previewWrite;
    if (picked) {
      await writeScoped(THEME_SECTION, picked.label, target);
      await applyTheme(picked.label, target);
    } else {
      await writeScoped(COLOR_CUSTOMIZATIONS, original, target);
    }
  }
}

export function onTerminalThemeChange(event: ConfigurationChangeEvent) {
  if (!event.affectsConfiguration(THEME_SECTION)) return;
  return applyTheme(getConfig({ section: THEME_SECTION }));
}

// Merge only colors stored at the target scope, leaving inherited settings intact.
export function applyTheme(themeName: string, target = getThemeTarget()) {
  const themeIndex = themes.findIndex((t: theme) => t.name === themeName);
  if (themeIndex === -1) {
    return showThemeDoesNotExist();
  }
  const current = getThemeColors(target) ?? {};
  if (themeName === "None") {
    return writeScoped(
      COLOR_CUSTOMIZATIONS,
      getNonTerminalStyles(current),
      target,
    );
  }
  return writeScoped(
    COLOR_CUSTOMIZATIONS,
    { ...current, ...themeSchemes[themeIndex] },
    target,
  );
}

function getNonTerminalStyles(allStyles: Record<string, string>) {
  const nonTerminal: Record<string, string> = {};
  for (const key of Object.keys(allStyles)) {
    if (!key.includes("terminal")) nonTerminal[key] = allStyles[key];
  }
  return nonTerminal;
}
