import assert from "assert";
import { window, commands } from "vscode";
import { changeCursorStyle, changeCursorWidth } from "../../commands/cursor";
import { stub, globalSetting } from "./helpers";

const BLINK = "terminal.integrated.cursorBlinking";
const STYLE = "terminal.integrated.cursorStyle";
const WIDTH = "terminal.integrated.cursorWidth";

suite("cursor commands", () => {
  const realShowQuickPick = window.showQuickPick;
  const blink = globalSetting<boolean>(BLINK);
  const style = globalSetting<string>(STYLE);
  const width = globalSetting<number>(WIDTH);

  suiteSetup(() => {
    blink.capture();
    style.capture();
    width.capture();
  });

  suiteTeardown(async () => {
    stub(window, "showQuickPick", realShowQuickPick);
    await blink.restore();
    await style.restore();
    await width.restore();
  });

  test("toggleBlinkingCursor flips the setting at global scope", async () => {
    await blink.set(false);
    await commands.executeCommand("terminalAllInOne.toggleBlinkingCursor");
    assert.strictEqual(blink.value(), true);
    await commands.executeCommand("terminalAllInOne.toggleBlinkingCursor");
    assert.strictEqual(blink.value(), false);
  });

  test("changeCursorStyle persists the picked style", async () => {
    await style.set("line");
    stub(window, "showQuickPick", async (items: any[]) =>
      items.find((i) => i.label === "block"),
    );
    await changeCursorStyle();
    assert.strictEqual(style.value(), "block");
  });

  test("changeCursorStyle restores on cancel", async () => {
    await style.set("underline");
    stub(window, "showQuickPick", async () => undefined);
    await changeCursorStyle();
    assert.strictEqual(style.value(), "underline");
  });

  test("changeCursorWidth parses the picked label to a number", async () => {
    await width.set(1);
    stub(window, "showQuickPick", async (items: any[]) =>
      items.find((i) => i.label === "5-pt"),
    );
    await changeCursorWidth();
    assert.strictEqual(width.value(), 5);
  });
});
