import assert from "assert";
import { window, QuickPickItem } from "vscode";
import livePreview from "../../helpers/livePreview";
import { stub, globalSetting } from "./helpers";

const SECTION = "terminal.integrated.fontSize";

interface SizeItem extends QuickPickItem {
  label: string;
}

const ITEMS: SizeItem[] = [8, 9, 10, 11].map((n) => ({ label: `${n}-pt` }));
const toValue = (item: SizeItem) => parseInt(item.label.slice(0, -3));

suite("livePreview", () => {
  const realShowQuickPick = window.showQuickPick;
  const size = globalSetting<number>(SECTION);

  suiteSetup(size.capture);

  suiteTeardown(async () => {
    stub(window, "showQuickPick", realShowQuickPick);
    await size.restore();
  });

  test("persists the picked value on accept", async () => {
    await size.set(12);
    stub(window, "showQuickPick", async (items: any) => items[2]); // pick 10-pt
    await livePreview({ section: SECTION, items: ITEMS, toValue });
    assert.strictEqual(size.value(), 10);
  });

  test("restores the original value on cancel, even after a preview write landed", async () => {
    await size.set(12);
    stub(window, "showQuickPick", async (_items: any, options: any) => {
      // Simulate a preview hover-write that already hit config, then Escape.
      await size.set(25);
      options.onDidSelectItem?.(ITEMS[3]);
      return undefined;
    });
    await livePreview({ section: SECTION, items: ITEMS, toValue });
    assert.strictEqual(size.value(), 12);
  });
});
