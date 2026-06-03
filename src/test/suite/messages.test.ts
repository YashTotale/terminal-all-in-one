import assert from "assert";
import { window, commands } from "vscode";
import { messagesEnabled, showWelcome, showError } from "../../messages";
import { stub, globalSetting } from "./helpers";

const DISABLE = "disableAllMessages";

suite("messages", () => {
  const realInfo = window.showInformationMessage;
  const realErr = window.showErrorMessage;
  const realExec = commands.executeCommand;
  const disabled = globalSetting<boolean>(DISABLE, "terminalAllInOne");

  suiteSetup(disabled.capture);

  suiteTeardown(async () => {
    stub(window, "showInformationMessage", realInfo);
    stub(window, "showErrorMessage", realErr);
    stub(commands, "executeCommand", realExec);
    await disabled.restore();
  });

  test("messagesEnabled reflects the disableAllMessages setting", async () => {
    await disabled.set(true);
    assert.strictEqual(messagesEnabled(), false);
    await disabled.set(false);
    assert.strictEqual(messagesEnabled(), true);
  });

  test("showWelcome opens the README when the button is clicked", async () => {
    await disabled.set(false);
    stub(window, "showInformationMessage", async () => "README");
    let opened: string | undefined;
    stub(commands, "executeCommand", async (cmd: string, arg?: string) => {
      if (cmd === "extension.open") opened = arg;
    });
    await showWelcome();
    assert.strictEqual(opened, "yasht.terminal-all-in-one");
  });

  test("showError stays silent when messages are disabled", async () => {
    await disabled.set(true);
    let called = false;
    stub(window, "showErrorMessage", () => {
      called = true;
      return Promise.resolve(undefined);
    });
    showError("boom");
    assert.strictEqual(called, false);
  });
});
