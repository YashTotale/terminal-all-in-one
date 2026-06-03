import assert from "assert";
import { window, workspace, ConfigurationTarget } from "vscode";
import {
  inspectScope,
  writeScoped,
  getConfig,
  updateConfig,
} from "../../helpers/config";
import { stub, globalSetting } from "./helpers";

const SECTION = "terminal.integrated.fontSize";

suite("config scope helpers", () => {
  const size = globalSetting<number>(SECTION);

  suiteSetup(size.capture);
  suiteTeardown(size.restore);

  test("inspectScope resolves the global value and target", async () => {
    await size.set(15);
    const scope = inspectScope(SECTION);
    assert.strictEqual(scope.target, ConfigurationTarget.Global);
    assert.strictEqual(scope.value, 15);
  });

  test("writeScoped writes at the target, and undefined clears back to default", async () => {
    await writeScoped(SECTION, 20, ConfigurationTarget.Global);
    assert.strictEqual(size.value(), 20);
    await writeScoped(SECTION, undefined, ConfigurationTarget.Global);
    assert.strictEqual(size.value(), undefined);
  });
});

suite("config get/update wrappers", () => {
  const size = globalSetting<number>(SECTION);
  const disabled = globalSetting<boolean>(
    "disableAllMessages",
    "terminalAllInOne",
  );

  suiteSetup(size.capture);

  suiteTeardown(async () => {
    await size.restore();
    await disabled.set(undefined);
  });

  test("getConfig reads a value, with and without a config prefix", async () => {
    await size.set(16);
    assert.strictEqual(getConfig({ section: SECTION }), 16);
    await disabled.set(true);
    assert.strictEqual(
      getConfig({ config: "terminalAllInOne", section: "disableAllMessages" }),
      true,
    );
  });

  test("updateConfig writes at global scope", async () => {
    await updateConfig({ section: SECTION, value: 18 });
    assert.strictEqual(size.value(), 18);
  });

  test("updateConfig swallows a rejected write into showError", async () => {
    const realGetConfiguration = workspace.getConfiguration;
    const realShowError = window.showErrorMessage;
    let shown: string | undefined;
    stub(window, "showErrorMessage", (msg: string) => {
      shown = msg;
      return Promise.resolve(undefined);
    });
    // get() keeps the showError messages-enabled gate working; update() rejects.
    stub(workspace, "getConfiguration", () => ({
      get: () => undefined,
      update: () => Promise.reject(new Error("update failed")),
    }));
    try {
      await updateConfig({ section: SECTION, value: 1 });
      assert.strictEqual(shown, "update failed");
    } finally {
      stub(workspace, "getConfiguration", realGetConfiguration);
      stub(window, "showErrorMessage", realShowError);
    }
  });
});
