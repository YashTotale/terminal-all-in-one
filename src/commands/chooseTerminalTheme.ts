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

const COLOR_CUSTOMIZATIONS = "workbench.colorCustomizations";
const THEME_SECTION = `${EXTENSION_NAME}.terminalTheme`;

function getWorkspaceTheme() {
  return configuration().inspect<string>(THEME_SECTION)?.workspaceValue;
}

/** Prefer an explicit Workspace theme override; otherwise use User settings. */
function getThemeTarget() {
  return getWorkspaceTheme() !== undefined
    ? ConfigurationTarget.Workspace
    : ConfigurationTarget.Global;
}

/** Read only colors stored at the selected scope, without inherited values. */
function getThemeColors(target: ConfigurationTarget) {
  const colors =
    configuration().inspect<Record<string, unknown>>(COLOR_CUSTOMIZATIONS);
  return target === ConfigurationTarget.Workspace
    ? colors?.workspaceValue
    : colors?.globalValue;
}

/** Preview and save at the theme's scope, restoring the original colors on cancel or failure. */
export async function chooseTerminalTheme() {
  const currentTheme = getConfig({ section: THEME_SECTION });
  const items: QuickPickItem[] = themes.map(({ name }) => ({
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
    if (picked && (await writeScoped(THEME_SECTION, picked.label, target))) {
      await applyTheme(picked.label, target);
    } else {
      await writeScoped(COLOR_CUSTOMIZATIONS, original, target);
    }
  }
}

/** Serialize theme changes and capture Workspace resets before later events can hide them. */
export function createTerminalThemeChangeHandler() {
  let workspaceTheme = getWorkspaceTheme();
  let queue: Promise<unknown> = Promise.resolve();
  return (event: ConfigurationChangeEvent) => {
    if (!event.affectsConfiguration(THEME_SECTION)) return;
    const previousTheme = workspaceTheme;
    workspaceTheme = getWorkspaceTheme();
    const clearedTheme =
      workspaceTheme === undefined ? previousTheme : undefined;
    const run = queue.then(async () => {
      if (clearedTheme !== undefined) await clearWorkspaceTheme(clearedTheme);
      return applyTheme(getConfig({ section: THEME_SECTION }));
    });
    queue = run.catch(() => undefined);
    return run;
  };
}

/** Remove only values still matching the old Workspace theme, preserving custom edits. */
async function clearWorkspaceTheme(themeName: string) {
  const generated = themes.find(({ name }) => name === themeName)?.colors;
  const current = getThemeColors(ConfigurationTarget.Workspace);
  if (!generated || !current) return;
  const remaining = Object.fromEntries(
    Object.entries(current).filter(([key, value]) => generated[key] !== value),
  );
  if (Object.keys(remaining).length === Object.keys(current).length) return;
  await writeScoped(
    COLOR_CUSTOMIZATIONS,
    Object.keys(remaining).length ? remaining : undefined,
    ConfigurationTarget.Workspace,
  );
}

/** Merge theme colors at the selected scope; "None" removes terminal styling at that scope. */
export function applyTheme(themeName: string, target = getThemeTarget()) {
  const theme = themes.find(({ name }) => name === themeName);
  if (!theme) {
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
    { ...current, ...theme.colors },
    target,
  );
}

function getNonTerminalStyles(allStyles: Record<string, unknown>) {
  const nonTerminal: Record<string, unknown> = {};
  for (const key of Object.keys(allStyles)) {
    if (!key.includes("terminal")) nonTerminal[key] = allStyles[key];
  }
  return nonTerminal;
}
