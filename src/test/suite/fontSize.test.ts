import assert from "assert";
import { window, commands } from "vscode";
import { changeFontSize } from "../../commands/fontSize";
import { tick, stub, globalSetting } from "./helpers";

const SECTION = "terminal.integrated.fontSize";

suite("fontSize commands", () => {
  const realShowQuickPick = window.showQuickPick;
  const size = globalSetting<number>(SECTION);

  suiteSetup(size.capture);

  suiteTeardown(async () => {
    stub(window, "showQuickPick", realShowQuickPick);
    await size.restore();
  });

  test("increase then decrease adjusts by 1 at global scope", async () => {
    await size.set(12);
    await commands.executeCommand("terminalAllInOne.increaseFontSize");
    await tick();
    assert.strictEqual(size.value(), 13);
    await commands.executeCommand("terminalAllInOne.decreaseFontSize");
    await tick();
    assert.strictEqual(size.value(), 12);
  });

  test("changeFontSize persists the picked size", async () => {
    await size.set(12);
    stub(window, "showQuickPick", async (items: any[]) =>
      items.find((i) => i.label === "16-pt"),
    );
    await changeFontSize();
    assert.strictEqual(size.value(), 16);
  });

  test("changeFontSize restores on cancel", async () => {
    await size.set(11);
    stub(window, "showQuickPick", async () => undefined);
    await changeFontSize();
    assert.strictEqual(size.value(), 11);
  });
});
