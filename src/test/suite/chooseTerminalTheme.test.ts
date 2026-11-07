import assert from "assert";
import { window, workspace, ConfigurationTarget } from "vscode";
import {
  applyTheme,
  createTerminalThemeChangeHandler,
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
        const onTerminalThemeChange = createTerminalThemeChangeHandler();
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

      for (const original of [undefined, { "editor.background": "#abcabc" }]) {
        test(`a failed theme save restores ${original ? "existing" : "unset"} colors after preview`, async () => {
          await colors.set(original);
          const realGetConfiguration = workspace.getConfiguration;
          const colorWrites: unknown[] = [];
          let shown: string | undefined;
          stub(window, "showErrorMessage", async (message: string) => {
            shown = message;
          });
          stub(
            workspace,
            "getConfiguration",
            (...args: Parameters<typeof realGetConfiguration>) => {
              const config = realGetConfiguration(...args);
              return {
                ...config,
                update: (
                  section: string,
                  value: any,
                  target: ConfigurationTarget,
                ) => {
                  if (section === THEME)
                    return Promise.reject(new Error("theme save failed"));
                  if (section === COLORS) colorWrites.push(value);
                  return config.update(section, value, target);
                },
              };
            },
          );
          stub(window, "showQuickPick", async (_items: any, options: any) => {
            await preview(options, themes[1].name);
            return { label: sample.name };
          });
          try {
            await chooseTerminalTheme();
            assert.strictEqual(theme.value(), "None");
            assert.deepStrictEqual(colors.value(), original);
            assert.deepStrictEqual(colorWrites, [
              { ...original, ...themes[1].colors },
              original,
            ]);
            assert.strictEqual(shown, "theme save failed");
          } finally {
            stub(workspace, "getConfiguration", realGetConfiguration);
          }
        });
      }

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

suite("theme change ordering", () => {
  const realGetConfiguration = workspace.getConfiguration;
  const realShowErrorMessage = window.showErrorMessage;
  const changed = {
    affectsConfiguration: (section: string) => section === THEME,
  } as any;
  let workspaceTheme: string | undefined;
  let workspaceColors: Record<string, unknown> | undefined;
  let userColors: Record<string, unknown> | undefined;
  let beforeWrite: (() => Promise<void>) | undefined;
  let failRead: boolean;

  function deferred() {
    let resolve!: () => void;
    const promise = new Promise<void>((done) => {
      resolve = done;
    });
    return { promise, resolve };
  }

  setup(() => {
    workspaceTheme = undefined;
    workspaceColors = { "editor.background": "#123456" };
    userColors = { ...themes[1].colors };
    beforeWrite = undefined;
    failRead = false;
    stub(window, "showErrorMessage", async () => undefined);
    stub(workspace, "getConfiguration", () => ({
      get: (section: string) =>
        section === THEME ? (workspaceTheme ?? themes[1].name) : undefined,
      inspect: (section: string) => {
        if (section === THEME) return { workspaceValue: workspaceTheme };
        if (failRead) {
          failRead = false;
          throw new Error("colors read failed");
        }
        return { workspaceValue: workspaceColors, globalValue: userColors };
      },
      update: async (
        section: string,
        value: Record<string, unknown> | undefined,
        target: ConfigurationTarget,
      ) => {
        assert.strictEqual(section, COLORS);
        await beforeWrite?.();
        if (target === ConfigurationTarget.Workspace) workspaceColors = value;
        else userColors = value;
      },
    }));
  });

  teardown(() => {
    stub(workspace, "getConfiguration", realGetConfiguration);
    stub(window, "showErrorMessage", realShowErrorMessage);
  });

  for (const newTheme of [undefined, "Unknown Theme"]) {
    test(`a reset waits for a pending apply${newTheme ? " and survives a newer override" : ""}`, async () => {
      const started = deferred();
      const release = deferred();
      beforeWrite = async () => {
        beforeWrite = undefined;
        started.resolve();
        await release.promise;
      };
      const onTerminalThemeChange = createTerminalThemeChangeHandler();
      workspaceTheme = sample.name;
      const applying = onTerminalThemeChange(changed);
      await started.promise;
      workspaceTheme = undefined;
      const resetting = onTerminalThemeChange(changed);
      workspaceTheme = newTheme;
      const replacing = newTheme ? onTerminalThemeChange(changed) : undefined;
      release.resolve();
      await Promise.all([applying, resetting, replacing]);
      assert.deepStrictEqual(workspaceColors, {
        "editor.background": "#123456",
      });
      assert.deepStrictEqual(userColors, themes[1].colors);
    });
  }

  test("a reset clears the queued replacement theme after a slow write", async () => {
    const started = deferred();
    const release = deferred();
    beforeWrite = async () => {
      beforeWrite = undefined;
      started.resolve();
      await release.promise;
    };
    const onTerminalThemeChange = createTerminalThemeChangeHandler();
    workspaceTheme = sample.name;
    const applying = onTerminalThemeChange(changed);
    await started.promise;
    workspaceTheme = themes[2].name;
    const replacing = onTerminalThemeChange(changed);
    workspaceTheme = undefined;
    const resetting = onTerminalThemeChange(changed);
    release.resolve();
    await Promise.all([applying, replacing, resetting]);
    assert.deepStrictEqual(workspaceColors, {
      "editor.background": "#123456",
    });
    assert.deepStrictEqual(userColors, themes[1].colors);
  });

  test("a rejected run reports its error without blocking later changes", async () => {
    const onTerminalThemeChange = createTerminalThemeChangeHandler();
    workspaceTheme = sample.name;
    failRead = true;
    await assert.rejects(
      async () => onTerminalThemeChange(changed),
      /colors read failed/,
    );
    workspaceTheme = themes[2].name;
    assert.strictEqual(await onTerminalThemeChange(changed), true);
    assert.deepStrictEqual(workspaceColors, {
      "editor.background": "#123456",
      ...themes[2].colors,
    });
  });
});

if (hasWorkspace) {
  suite("workspace theme reset", () => {
    const userTheme = globalSetting<string>(THEME);
    const userColors = globalSetting<Record<string, unknown>>(COLORS);
    const workspaceTheme = scopedSetting<string>(
      THEME,
      ConfigurationTarget.Workspace,
    );
    const workspaceColors = scopedSetting<Record<string, unknown>>(
      COLORS,
      ConfigurationTarget.Workspace,
    );
    const originalUserColors = {
      "editor.foreground": "#abcdef",
      ...sample.colors,
    };
    const changed = {
      affectsConfiguration: (section: string) => section === THEME,
    } as any;

    suiteSetup(() => {
      userTheme.capture();
      userColors.capture();
      workspaceTheme.capture();
      workspaceColors.capture();
    });

    setup(async () => {
      await userTheme.set(sample.name);
      await workspaceTheme.set(undefined);
      await tick();
      await userColors.set(originalUserColors);
      await workspaceColors.set(undefined);
    });

    suiteTeardown(async () => {
      await userTheme.restore();
      await workspaceTheme.restore();
      await tick();
      await userColors.restore();
      await workspaceColors.restore();
    });

    const customizations: [string, Record<string, unknown> | undefined][] = [
      ["only generated colors", undefined],
      [
        "unrelated customizations",
        {
          "editor.background": "#123456",
          "[Default Dark Modern]": { "editor.foreground": "#654321" },
        },
      ],
      [
        "manual terminal edits",
        {
          "terminal.background": "#abcabc",
          "terminal.selectionBackground": "#123456",
        },
      ],
    ];

    for (const [name, remaining] of customizations) {
      test(`resetting a saved Workspace theme with ${name}`, async () => {
        await workspaceTheme.set(themes[1].name);
        await tick();
        await workspaceColors.set({ ...themes[1].colors, ...remaining });
        const onTerminalThemeChange = createTerminalThemeChangeHandler();

        await workspaceTheme.set(undefined);
        await onTerminalThemeChange(changed);

        assert.strictEqual(workspaceTheme.value(), undefined);
        assert.deepStrictEqual(workspaceColors.value(), remaining);
        assert.deepStrictEqual(userColors.value(), originalUserColors);
        const effective = workspace
          .getConfiguration()
          .get<Record<string, unknown>>(COLORS);
        assert.strictEqual(
          effective?.["terminal.ansiBlue"],
          sample.colors["terminal.ansiBlue"],
        );
        assert.strictEqual(
          effective?.["terminal.background"],
          remaining?.["terminal.background"] ??
            sample.colors["terminal.background"],
        );
      });
    }

    test("resetting an override removes the last theme applied in this session", async () => {
      const onTerminalThemeChange = createTerminalThemeChangeHandler();
      for (const theme of [sample, themes[1]]) {
        await workspaceTheme.set(theme.name);
        await onTerminalThemeChange(changed);
        assert.deepStrictEqual(workspaceColors.value(), theme.colors);
      }
      await workspaceTheme.set(undefined);
      await onTerminalThemeChange(changed);
      assert.strictEqual(workspaceColors.value(), undefined);
      assert.deepStrictEqual(userColors.value(), originalUserColors);
    });

    test("changing a User theme leaves independently configured Workspace colors alone", async () => {
      await workspaceColors.set({ ...themes[1].colors });
      const onTerminalThemeChange = createTerminalThemeChangeHandler();
      await userTheme.set(themes[2].name);
      await onTerminalThemeChange(changed);
      assert.deepStrictEqual(workspaceColors.value(), themes[1].colors);
      assert.deepStrictEqual(userColors.value(), {
        "editor.foreground": "#abcdef",
        ...themes[2].colors,
      });
    });
  });
}
