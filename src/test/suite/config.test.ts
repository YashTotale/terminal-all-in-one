import assert from "assert";
import { workspace, ConfigurationTarget } from "vscode";
import { inspectScope, writeScoped } from "../../helpers/config";

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
