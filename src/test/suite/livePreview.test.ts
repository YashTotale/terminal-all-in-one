import assert from "assert";
import { window, workspace, ConfigurationTarget, QuickPickItem } from "vscode";
import livePreview from "../../helpers/livePreview";

const SECTION = "terminal.integrated.fontSize";

interface SizeItem extends QuickPickItem {
  label: string;
}

const ITEMS: SizeItem[] = [8, 9, 10, 11].map((n) => ({ label: `${n}-pt` }));
const toValue = (item: SizeItem) => parseInt(item.label.slice(0, -3));

suite("livePreview", () => {
  const realShowQuickPick = window.showQuickPick;
  let original: number | undefined;

  suiteSetup(() => {
    original = workspace.getConfiguration().inspect(SECTION)?.globalValue as
      | number
      | undefined;
  });

  suiteTeardown(async () => {
    (window as { showQuickPick: typeof window.showQuickPick }).showQuickPick =
      realShowQuickPick;
    await workspace
      .getConfiguration()
      .update(SECTION, original, ConfigurationTarget.Global);
  });

  async function setBaseline(value: number) {
    await workspace
      .getConfiguration()
      .update(SECTION, value, ConfigurationTarget.Global);
  }

  function stubQuickPick(impl: (items: any, options: any) => Promise<any>) {
    (window as { showQuickPick: any }).showQuickPick = impl;
  }

  test("persists the picked value on accept", async () => {
    await setBaseline(12);
    stubQuickPick(async (items) => items[2]); // pick 10-pt
    await livePreview({ section: SECTION, items: ITEMS, toValue });
    assert.strictEqual(workspace.getConfiguration().get(SECTION), 10);
  });

  test("restores the original value on cancel, even after a preview write landed", async () => {
    await setBaseline(12);
    stubQuickPick(async (_items, options) => {
      // Simulate a preview hover-write that already hit config, then Escape.
      await workspace
        .getConfiguration()
        .update(SECTION, 25, ConfigurationTarget.Global);
      options.onDidSelectItem?.(ITEMS[3]);
      return undefined;
    });
    await livePreview({ section: SECTION, items: ITEMS, toValue });
    assert.strictEqual(workspace.getConfiguration().get(SECTION), 12);
  });
});
