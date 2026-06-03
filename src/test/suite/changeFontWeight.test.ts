import assert from "assert";
import { window } from "vscode";
import { changeFontWeight } from "../../commands/changeFontWeight";
import { stub, globalSetting } from "./helpers";

const SECTION = "terminal.integrated.fontWeight";

suite("changeFontWeight", () => {
  const realShowQuickPick = window.showQuickPick;
  const weight = globalSetting<string>(SECTION);

  suiteSetup(weight.capture);

  suiteTeardown(async () => {
    stub(window, "showQuickPick", realShowQuickPick);
    await weight.restore();
  });

  test("persists the picked weight", async () => {
    await weight.set("normal");
    stub(window, "showQuickPick", async (items: any[]) =>
      items.find((i) => i.label === "bold"),
    );
    await changeFontWeight();
    assert.strictEqual(weight.value(), "bold");
  });

  test("persists a numeric weight string", async () => {
    await weight.set("normal");
    stub(window, "showQuickPick", async (items: any[]) =>
      items.find((i) => i.label === "300"),
    );
    await changeFontWeight();
    assert.strictEqual(weight.value(), "300");
  });

  test("restores on cancel", async () => {
    await weight.set("bold");
    stub(window, "showQuickPick", async () => undefined);
    await changeFontWeight();
    assert.strictEqual(weight.value(), "bold");
  });
});
