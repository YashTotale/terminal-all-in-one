import assert from "assert";
import { window, commands, workspace, ConfigurationTarget } from "vscode";
import { changeFontSize } from "../../commands/fontSize";

const SECTION = "terminal.integrated.fontSize";
const tick = () => new Promise((r) => setTimeout(r, 100));

suite("fontSize commands", () => {
  const realShowQuickPick = window.showQuickPick;
  let original: number | undefined;

  suiteSetup(() => {
    original = workspace.getConfiguration().inspect(SECTION)?.globalValue as
      | number
      | undefined;
  });

  suiteTeardown(async () => {
    (window as { showQuickPick: any }).showQuickPick = realShowQuickPick;
    await workspace
      .getConfiguration()
      .update(SECTION, original, ConfigurationTarget.Global);
  });

  test("increase then decrease adjusts by 1 at global scope", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, 12, ConfigurationTarget.Global);
    await commands.executeCommand("terminalAllInOne.increaseFontSize");
    await tick();
    assert.strictEqual(
      workspace.getConfiguration().inspect(SECTION)?.globalValue,
      13,
    );
    await commands.executeCommand("terminalAllInOne.decreaseFontSize");
    await tick();
    assert.strictEqual(workspace.getConfiguration().get(SECTION), 12);
  });

  test("changeFontSize persists the picked size", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, 12, ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async (items: any[]) =>
      items.find((i) => i.label === "16-pt");
    await changeFontSize();
    assert.strictEqual(workspace.getConfiguration().get(SECTION), 16);
  });

  test("changeFontSize restores on cancel", async () => {
    await workspace
      .getConfiguration()
      .update(SECTION, 11, ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async () => undefined;
    await changeFontSize();
    assert.strictEqual(workspace.getConfiguration().get(SECTION), 11);
  });
});
