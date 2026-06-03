import assert from "assert";
import { window, commands, workspace, ConfigurationTarget } from "vscode";
import { messagesEnabled, showWelcome, showError } from "../../messages";

const DISABLE = "disableAllMessages";

suite("messages", () => {
  const realInfo = window.showInformationMessage;
  const realErr = window.showErrorMessage;
  const realExec = commands.executeCommand;

  suiteTeardown(async () => {
    (window as { showInformationMessage: any }).showInformationMessage =
      realInfo;
    (window as { showErrorMessage: any }).showErrorMessage = realErr;
    (commands as { executeCommand: any }).executeCommand = realExec;
    await workspace
      .getConfiguration("terminalAllInOne")
      .update(DISABLE, undefined, ConfigurationTarget.Global);
  });

  async function setDisabled(v: boolean | undefined) {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update(DISABLE, v, ConfigurationTarget.Global);
  }

  test("messagesEnabled reflects the disableAllMessages setting", async () => {
    await setDisabled(true);
    assert.strictEqual(messagesEnabled(), false);
    await setDisabled(false);
    assert.strictEqual(messagesEnabled(), true);
  });

  test("showWelcome opens the README when the button is clicked", async () => {
    await setDisabled(false);
    (window as { showInformationMessage: any }).showInformationMessage =
      async () => "README";
    let opened: string | undefined;
    (commands as { executeCommand: any }).executeCommand = async (
      cmd: string,
      arg?: string,
    ) => {
      if (cmd === "extension.open") opened = arg;
    };
    await showWelcome();
    assert.strictEqual(opened, "yasht.terminal-all-in-one");
  });

  test("showError stays silent when messages are disabled", async () => {
    await setDisabled(true);
    let called = false;
    (window as { showErrorMessage: any }).showErrorMessage = () => {
      called = true;
      return Promise.resolve(undefined);
    };
    showError("boom");
    assert.strictEqual(called, false);
  });
});
