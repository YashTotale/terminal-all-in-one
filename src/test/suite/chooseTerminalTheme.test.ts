import assert from "assert";
import { window } from "vscode";
import {
  applyTheme,
  onTerminalThemeChange,
  chooseTerminalTheme,
} from "../../commands/chooseTerminalTheme";
import themes from "../../themes.json";
import { tick, stub, globalSetting } from "./helpers";

const COLORS = "workbench.colorCustomizations";
const THEME = "terminalAllInOne.terminalTheme";
const sample = themes[0];

suite("chooseTerminalTheme", () => {
  const realShowQuickPick = window.showQuickPick;
  const realShowErrorMessage = window.showErrorMessage;
  const colors = globalSetting<Record<string, string>>(COLORS);
  const theme = globalSetting<string>(THEME);

  suiteSetup(() => {
    colors.capture();
    theme.capture();
  });

  suiteTeardown(async () => {
    stub(window, "showQuickPick", realShowQuickPick);
    stub(window, "showErrorMessage", realShowErrorMessage);
    await colors.restore();
    await theme.restore();
  });

  test("applyTheme merges the theme's colors onto existing customizations", async () => {
    await colors.set({ "editor.background": "#123456" });
    await applyTheme(sample.name);
    assert.deepStrictEqual(colors.value(), {
      "editor.background": "#123456",
      ...sample.colors,
    });
  });

  test("applyTheme('None') strips terminal colors, keeping the rest", async () => {
    await colors.set({
      "editor.background": "#123456",
      "terminal.background": "#000000",
      "terminalCursor.foreground": "#ffffff",
    });
    await applyTheme("None");
    assert.deepStrictEqual(colors.value(), { "editor.background": "#123456" });
  });

  test("applyTheme on an unknown theme errors and writes nothing", async () => {
    await colors.set({ "editor.background": "#123456" });
    let shown = false;
    stub(window, "showErrorMessage", () => {
      shown = true;
      return Promise.resolve(undefined);
    });
    await applyTheme("Definitely Not A Real Theme");
    assert.ok(shown, "expected the theme-does-not-exist error");
    assert.deepStrictEqual(colors.value(), { "editor.background": "#123456" });
  });

  test("onTerminalThemeChange applies the saved theme only when affected", async () => {
    await theme.set(sample.name);
    await tick();
    await colors.set({});
    onTerminalThemeChange({
      affectsConfiguration: (s: string) => s === THEME,
    } as any);
    await tick();
    assert.deepStrictEqual(colors.value(), { ...sample.colors });

    await colors.set({ "editor.background": "#123456" });
    onTerminalThemeChange({ affectsConfiguration: () => false } as any);
    await tick();
    assert.deepStrictEqual(colors.value(), { "editor.background": "#123456" });
  });

  test("the picker persists the chosen theme name on accept", async () => {
    await theme.set("None");
    stub(window, "showQuickPick", async () => ({ label: sample.name }));
    await chooseTerminalTheme();
    // chooseTerminalTheme persists the theme name without awaiting the write.
    await tick();
    assert.strictEqual(theme.value(), sample.name);
  });

  test("the picker restores colorCustomizations on cancel", async () => {
    await colors.set({ "editor.background": "#abcabc" });
    stub(window, "showQuickPick", async () => undefined);
    await chooseTerminalTheme();
    assert.deepStrictEqual(colors.value(), { "editor.background": "#abcabc" });
  });
});
