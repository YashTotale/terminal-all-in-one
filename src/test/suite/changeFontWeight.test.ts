import assert from "assert";
import { window, workspace, ConfigurationTarget } from "vscode";
import { changeFontWeight } from "../../commands/changeFontWeight";

const SECTION = "terminal.integrated.fontWeight";

suite("changeFontWeight", () => {
  const realShowQuickPick = window.showQuickPick;
  let original: string | undefined;

  suiteSetup(() => {
    original = workspace.getConfiguration().inspect(SECTION)?.globalValue as
      | string
      | undefined;
  });

  suiteTeardown(async () => {
    (window as { showQuickPick: any }).showQuickPick = realShowQuickPick;
    await workspace
      .getConfiguration()
      .update(SECTION, original, ConfigurationTarget.Global);
  });

  test("persists the picked weight", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, "normal", ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async (items: any[]) =>
      items.find((i) => i.label === "bold");
    await changeFontWeight();
    assert.strictEqual(workspace.getConfiguration().get(SECTION), "bold");
  });

  test("persists a numeric weight string", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, "normal", ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async (items: any[]) =>
      items.find((i) => i.label === "300");
    await changeFontWeight();
    assert.strictEqual(workspace.getConfiguration().get(SECTION), "300");
  });

  test("restores on cancel", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, "bold", ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async () => undefined;
    await changeFontWeight();
    assert.strictEqual(workspace.getConfiguration().get(SECTION), "bold");
  });
});
