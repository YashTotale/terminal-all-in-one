import assert from "assert";
import { window, commands, workspace, ConfigurationTarget } from "vscode";
import { changeCursorStyle, changeCursorWidth } from "../../commands/cursor";

const BLINK = "terminal.integrated.cursorBlinking";
const STYLE = "terminal.integrated.cursorStyle";
const WIDTH = "terminal.integrated.cursorWidth";

suite("cursor commands", () => {
  const realShowQuickPick = window.showQuickPick;
  let origBlink: boolean | undefined;
  let origStyle: string | undefined;
  let origWidth: number | undefined;

  suiteSetup(() => {
    const c = workspace.getConfiguration();
    origBlink = c.inspect(BLINK)?.globalValue as boolean | undefined;
    origStyle = c.inspect(STYLE)?.globalValue as string | undefined;
    origWidth = c.inspect(WIDTH)?.globalValue as number | undefined;
  });

  suiteTeardown(async () => {
    (window as { showQuickPick: any }).showQuickPick = realShowQuickPick;
    const c = workspace.getConfiguration();
    await c.update(BLINK, origBlink, ConfigurationTarget.Global);
    await c.update(STYLE, origStyle, ConfigurationTarget.Global);
    await c.update(WIDTH, origWidth, ConfigurationTarget.Global);
  });

  test("toggleBlinkingCursor flips the setting at global scope", async () => {
    await workspace
      .getConfiguration()
      .update(BLINK, false, ConfigurationTarget.Global);
    await commands.executeCommand("terminalAllInOne.toggleBlinkingCursor");
    assert.strictEqual(
      workspace.getConfiguration().inspect(BLINK)?.globalValue,
      true,
    );
    await commands.executeCommand("terminalAllInOne.toggleBlinkingCursor");
    assert.strictEqual(workspace.getConfiguration().get(BLINK), false);
  });

  test("changeCursorStyle persists the picked style", async () => {
    await workspace
      .getConfiguration()
      .update(STYLE, "line", ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async (items: any[]) =>
      items.find((i) => i.label === "block");
    await changeCursorStyle();
    assert.strictEqual(workspace.getConfiguration().get(STYLE), "block");
  });

  test("changeCursorStyle restores on cancel", async () => {
    await workspace
      .getConfiguration()
      .update(STYLE, "underline", ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async () => undefined;
    await changeCursorStyle();
    assert.strictEqual(workspace.getConfiguration().get(STYLE), "underline");
  });

  test("changeCursorWidth parses the picked label to a number", async () => {
    await workspace
      .getConfiguration()
      .update(WIDTH, 1, ConfigurationTarget.Global);
    (window as { showQuickPick: any }).showQuickPick = async (items: any[]) =>
      items.find((i) => i.label === "5-pt");
    await changeCursorWidth();
    assert.strictEqual(workspace.getConfiguration().get(WIDTH), 5);
  });
});
