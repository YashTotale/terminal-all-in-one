import assert from "assert";
import { window, workspace, ConfigurationTarget } from "vscode";
import {
  applyTheme,
  onTerminalThemeChange,
  chooseTerminalTheme,
} from "../../commands/chooseTerminalTheme";
import themes from "../../themes.json";

const COLORS = "workbench.colorCustomizations";
const THEME = "terminalAllInOne.terminalTheme";
const sample = themes[0];

function colorsValue() {
  return workspace.getConfiguration().inspect(COLORS)?.globalValue as
    | Record<string, string>
    | undefined;
}
async function setColors(value: Record<string, string> | undefined) {
  await workspace
    .getConfiguration()
    .update(COLORS, value, ConfigurationTarget.Global);
}
const tick = () => new Promise((r) => setTimeout(r, 100));

suite("chooseTerminalTheme", () => {
  const realShowQuickPick = window.showQuickPick;
  const realShowErrorMessage = window.showErrorMessage;
  let originalColors: Record<string, string> | undefined;
  let originalTheme: string | undefined;

  suiteSetup(() => {
    originalColors = colorsValue();
    originalTheme = workspace.getConfiguration().inspect(THEME)?.globalValue as
      | string
      | undefined;
  });

  suiteTeardown(async () => {
    (window as { showQuickPick: any }).showQuickPick = realShowQuickPick;
    (window as { showErrorMessage: any }).showErrorMessage =
      realShowErrorMessage;
    await setColors(originalColors);
    await workspace
      .getConfiguration()
      .update(THEME, originalTheme, ConfigurationTarget.Global);
  });

  test("applyTheme merges the theme's colors onto existing customizations", async () => {
    await setColors({ "editor.background": "#123456" });
    await applyTheme(sample.name);
    assert.deepStrictEqual(colorsValue(), {
      "editor.background": "#123456",
      ...sample.colors,
    });
  });

  test("applyTheme('None') strips terminal colors, keeping the rest", async () => {
    await setColors({
      "editor.background": "#123456",
      "terminal.background": "#000000",
      "terminalCursor.foreground": "#ffffff",
    });
    await applyTheme("None");
    assert.deepStrictEqual(colorsValue(), { "editor.background": "#123456" });
  });

  test("applyTheme on an unknown theme errors and writes nothing", async () => {
    await setColors({ "editor.background": "#123456" });
    let shown = false;
    (window as { showErrorMessage: any }).showErrorMessage = () => {
      shown = true;
      return Promise.resolve(undefined);
    };
    await applyTheme("Definitely Not A Real Theme");
    assert.ok(shown, "expected the theme-does-not-exist error");
    assert.deepStrictEqual(colorsValue(), { "editor.background": "#123456" });
  });

  test("onTerminalThemeChange applies the saved theme only when affected", async () => {
    await workspace
      .getConfiguration()
      .update(THEME, sample.name, ConfigurationTarget.Global);
    await tick();
    await setColors({});
    onTerminalThemeChange({
      affectsConfiguration: (s: string) => s === THEME,
    } as any);
    await tick();
    assert.deepStrictEqual(colorsValue(), { ...sample.colors });

    await setColors({ "editor.background": "#123456" });
    onTerminalThemeChange({ affectsConfiguration: () => false } as any);
    await tick();
    assert.deepStrictEqual(colorsValue(), { "editor.background": "#123456" });
  });

  test("the picker persists the chosen theme name on accept", async () => {
    await workspace
      .getConfiguration()
      .update(THEME, "None", ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async () => ({
      label: sample.name,
    });
    await chooseTerminalTheme();
    // chooseTerminalTheme persists the theme name without awaiting the write.
    await tick();
    assert.strictEqual(workspace.getConfiguration().get(THEME), sample.name);
  });

  test("the picker restores colorCustomizations on cancel", async () => {
    await setColors({ "editor.background": "#abcabc" });
    (window as { showQuickPick: any }).showQuickPick = async () => undefined;
    await chooseTerminalTheme();
    assert.deepStrictEqual(colorsValue(), { "editor.background": "#abcabc" });
  });
});
