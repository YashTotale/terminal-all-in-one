import assert from "assert";
import { window, workspace, ConfigurationTarget } from "vscode";
import {
  inspectScope,
  writeScoped,
  getConfig,
  updateConfig,
} from "../../helpers/config";

const SECTION = "terminal.integrated.fontSize";

suite("config scope helpers", () => {
  let original: number | undefined;

  suiteSetup(() => {
    original = workspace.getConfiguration().inspect(SECTION)?.globalValue as
      | number
      | undefined;
  });

  suiteTeardown(async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, original, ConfigurationTarget.Global);
  });

  test("inspectScope resolves the global value and target", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, 15, ConfigurationTarget.Global);
    const scope = inspectScope(SECTION);
    assert.strictEqual(scope.target, ConfigurationTarget.Global);
    assert.strictEqual(scope.value, 15);
  });

  test("writeScoped writes at the target, and undefined clears back to default", async () => {
    await writeScoped(SECTION, 20, ConfigurationTarget.Global);
    assert.strictEqual(
      workspace.getConfiguration().inspect(SECTION)?.globalValue,
      20,
    );
    await writeScoped(SECTION, undefined, ConfigurationTarget.Global);
    assert.strictEqual(
      workspace.getConfiguration().inspect(SECTION)?.globalValue,
      undefined,
    );
  });
});

suite("config get/update wrappers", () => {
  let original: number | undefined;

  suiteSetup(() => {
    original = workspace.getConfiguration().inspect(SECTION)?.globalValue as
      | number
      | undefined;
  });

  suiteTeardown(async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, original, ConfigurationTarget.Global);
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("disableAllMessages", undefined, ConfigurationTarget.Global);
  });

  test("getConfig reads a value, with and without a config prefix", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, 16, ConfigurationTarget.Global);
    assert.strictEqual(getConfig({ section: SECTION }), 16);
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("disableAllMessages", true, ConfigurationTarget.Global);
    assert.strictEqual(
      getConfig({ config: "terminalAllInOne", section: "disableAllMessages" }),
      true,
    );
  });

  test("updateConfig writes at global scope", async () => {
    await updateConfig({ section: SECTION, value: 18 });
    assert.strictEqual(
      workspace.getConfiguration().inspect(SECTION)?.globalValue,
      18,
    );
  });

  test("updateConfig swallows a rejected write into showError", async () => {
    const realGetConfiguration = workspace.getConfiguration;
    const realShowError = window.showErrorMessage;
    let shown: string | undefined;
    (window as { showErrorMessage: any }).showErrorMessage = (msg: string) => {
      shown = msg;
      return Promise.resolve(undefined);
    };
    // get() keeps the showError messages-enabled gate working; update() rejects.
    (workspace as { getConfiguration: any }).getConfiguration = () => ({
      get: () => undefined,
      update: () => Promise.reject(new Error("update failed")),
    });
    try {
      await updateConfig({ section: SECTION, value: 1 });
      assert.strictEqual(shown, "update failed");
    } finally {
      (workspace as { getConfiguration: any }).getConfiguration =
        realGetConfiguration;
      (window as { showErrorMessage: any }).showErrorMessage = realShowError;
    }
  });
});
