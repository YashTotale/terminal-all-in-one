import assert from "assert";
import { window, commands, workspace, ConfigurationTarget } from "vscode";
import RunScript from "../../commands/runScript";

suite("RunScript.execute", () => {
  const cmd = new RunScript({ subscriptions: [] } as never);
  const realCreateTerminal = window.createTerminal;
  const realExecuteCommand = commands.executeCommand;
  let sequence: string | undefined;

  suiteSetup(() => {
    // No real terminals are ever created in tests, so activeTerminal stays undefined and execute() takes the createTerminal path.
    try {
      Object.defineProperty(window, "activeTerminal", {
        configurable: true,
        get: () => undefined,
      });
    } catch {
      // Fall back to the "no real terminal in the test host" assumption.
    }
  });

  suiteTeardown(async () => {
    (
      window as { createTerminal: typeof window.createTerminal }
    ).createTerminal = realCreateTerminal;
    (
      commands as { executeCommand: typeof commands.executeCommand }
    ).executeCommand = realExecuteCommand;
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("script.disableAutoRun", undefined, ConfigurationTarget.Global);
  });

  setup(() => {
    sequence = undefined;
    (window as { createTerminal: any }).createTerminal = () =>
      ({ show() {} }) as never;
    (commands as { executeCommand: any }).executeCommand = (
      command: string,
      args?: { text?: string },
    ) => {
      if (command === "workbench.action.terminal.sendSequence") {
        sequence = args?.text;
      }
      return Promise.resolve();
    };
  });

  test("joins array commands with && and runs them (trailing carriage return)", async () => {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("script.disableAutoRun", false, ConfigurationTarget.Global);
    await cmd.execute({ name: "Multi", script: ["a", "b", "c"] });
    assert.strictEqual(sequence, "a && b && c\r");
  });

  test("disableAutoRun inserts the command without running it (no carriage return)", async () => {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("script.disableAutoRun", true, ConfigurationTarget.Global);
    await cmd.execute({ name: "Solo", script: "echo hi" });
    assert.strictEqual(sequence, "echo hi");
  });
});
