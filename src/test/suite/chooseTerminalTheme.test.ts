import assert from "assert";
import { window, workspace, ConfigurationTarget } from "vscode";
import {
  applyTheme,
  onTerminalThemeChange,
  chooseTerminalTheme,
} from "../../commands/chooseTerminalTheme";
import themes from "../../themes.json";
import { tick, stub, globalSetting, scopedSetting } from "./helpers";

const COLORS = "workbench.colorCustomizations";
const THEME = "terminalAllInOne.terminalTheme";
const sample = themes[0];
const hasWorkspace = workspace.name !== undefined;
const targets: (ConfigurationTarget.Global | ConfigurationTarget.Workspace)[] =
  hasWorkspace
    ? [ConfigurationTarget.Global, ConfigurationTarget.Workspace]
    : [ConfigurationTarget.Global];

for (const target of targets) {
  suite(
    `chooseTerminalTheme (${target === ConfigurationTarget.Global ? "User" : "Workspace"})`,
    () => {
      const realShowQuickPick = window.showQuickPick;
      const realShowErrorMessage = window.showErrorMessage;
      const colors = scopedSetting<Record<string, string>>(COLORS, target);
      const theme = scopedSetting<string>(THEME, target);
      const userColors = globalSetting<Record<string, string>>(COLORS);
      const userTheme = globalSetting<string>(THEME);
      const workspaceColors = hasWorkspace
        ? scopedSetting<Record<string, string>>(
            COLORS,
            ConfigurationTarget.Workspace,
          )
        : undefined;
      const workspaceTheme = hasWorkspace
        ? scopedSetting<string>(THEME, ConfigurationTarget.Workspace)
        : undefined;
      const workspaceCustomizations = { "editor.background": "#223344" };
      const inheritedColors = {
        "editor.foreground": "#abcdef",
        "terminal.background": "#112233",
      };

      suiteSetup(async () => {
        userColors.capture();
        userTheme.capture();
        colors.capture();
        theme.capture();
        workspaceColors?.capture();
        workspaceTheme?.capture();
        if (target === ConfigurationTarget.Workspace) {
          await userTheme.set("None");
          await tick();
          await userColors.set(inheritedColors);
        } else if (hasWorkspace) {
          await workspaceTheme!.set(undefined);
          await tick();
          await workspaceColors!.set(workspaceCustomizations);
        }
      });

      setup(async () => {
        await theme.set("None");
        await tick();
        await colors.set(undefined);
      });

      teardown(() => {
        stub(window, "showQuickPick", realShowQuickPick);
        stub(window, "showErrorMessage", realShowErrorMessage);
        if (target === ConfigurationTarget.Workspace) {
          assert.deepStrictEqual(userColors.value(), inheritedColors);
          assert.strictEqual(userTheme.value(), "None");
        } else if (hasWorkspace) {
          assert.deepStrictEqual(
            workspaceColors!.value(),
            workspaceCustomizations,
          );
          assert.strictEqual(workspaceTheme!.value(), undefined);
        }
      });

      suiteTeardown(async () => {
        await userTheme.restore();
        await theme.restore();
        await workspaceTheme?.restore();
        await tick();
        await userColors.restore();
        await colors.restore();
        await workspaceColors?.restore();
      });

      async function preview(options: any, name = sample.name) {
        const applied = new Promise<void>((resolve) => {
          const listener = workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration(COLORS)) {
              listener.dispose();
              resolve();
            }
          });
        });
        options.onDidSelectItem({ label: name });
        await applied;
      }

      test("applyTheme creates colors at the target scope without copying inherited colors", async () => {
        await applyTheme(sample.name);
        assert.deepStrictEqual(colors.value(), { ...sample.colors });
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
        assert.deepStrictEqual(colors.value(), {
          "editor.background": "#123456",
        });
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
        assert.deepStrictEqual(colors.value(), {
          "editor.background": "#123456",
        });
      });

      test("onTerminalThemeChange applies the saved theme only when affected", async () => {
        await theme.set(sample.name);
        await tick();
        await colors.set({});
        await onTerminalThemeChange({
          affectsConfiguration: (s: string) => s === THEME,
        } as any);
        assert.deepStrictEqual(colors.value(), { ...sample.colors });

        await colors.set({ "editor.background": "#123456" });
        await onTerminalThemeChange({
          affectsConfiguration: () => false,
        } as any);
        assert.deepStrictEqual(colors.value(), {
          "editor.background": "#123456",
        });
      });

      test("the picker persists the chosen theme name and colors on accept without a preview", async () => {
        stub(window, "showQuickPick", async () => ({ label: sample.name }));
        await chooseTerminalTheme();
        assert.strictEqual(theme.value(), sample.name);
        assert.deepStrictEqual(colors.value(), { ...sample.colors });
      });

      if (target === ConfigurationTarget.Global) {
        test("the picker defaults to User settings when the theme is unset", async () => {
          await theme.set(undefined);
          await tick();
          stub(window, "showQuickPick", async () => ({ label: sample.name }));
          await chooseTerminalTheme();
          assert.strictEqual(userTheme.value(), sample.name);
          assert.deepStrictEqual(userColors.value(), { ...sample.colors });
        });
      }

      test("accepting the current theme replaces a different preview", async () => {
        await theme.set(sample.name);
        await tick();
        await applyTheme(sample.name);
        stub(window, "showQuickPick", async (_items: any, options: any) => {
          await preview(options, themes[1].name);
          return { label: sample.name };
        });
        await chooseTerminalTheme();
        assert.strictEqual(theme.value(), sample.name);
        assert.deepStrictEqual(colors.value(), { ...sample.colors });
      });

      test("the picker restores colorCustomizations after a preview is canceled", async () => {
        await colors.set({ "editor.background": "#abcabc" });
        stub(window, "showQuickPick", async (_items: any, options: any) => {
          await preview(options);
          assert.deepStrictEqual(colors.value(), {
            "editor.background": "#abcabc",
            ...sample.colors,
          });
          return undefined;
        });
        await chooseTerminalTheme();
        assert.deepStrictEqual(colors.value(), {
          "editor.background": "#abcabc",
        });
        assert.strictEqual(theme.value(), "None");
      });

      test("canceling a preview removes an initially unset color customization", async () => {
        stub(window, "showQuickPick", async (_items: any, options: any) => {
          await preview(options);
          return undefined;
        });
        await chooseTerminalTheme();
        assert.strictEqual(colors.value(), undefined);
      });

      test("a picker error restores colors after a preview", async () => {
        stub(window, "showQuickPick", async (_items: any, options: any) => {
          await preview(options);
          throw new Error("picker failed");
        });
        await assert.rejects(chooseTerminalTheme(), /picker failed/);
        assert.strictEqual(colors.value(), undefined);
      });
    },
  );
}
