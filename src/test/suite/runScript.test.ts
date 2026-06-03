import assert from "assert";
import { window, commands, workspace, ConfigurationTarget } from "vscode";
import { execute, runScript, getScriptsConfig } from "../../commands/runScript";

suite("runScript execute", () => {
  const realCreateTerminal = window.createTerminal;
  const realExecuteCommand = commands.executeCommand;
  let sequence: string | undefined;
  let originalActiveTerminal: PropertyDescriptor | undefined;
  let activeTerminalRedefined = false;

  suiteSetup(() => {
    // No real terminals are ever created in tests, so activeTerminal stays undefined and execute() takes the createTerminal path.
    originalActiveTerminal = Object.getOwnPropertyDescriptor(
      window,
      "activeTerminal",
    );
    try {
      Object.defineProperty(window, "activeTerminal", {
        configurable: true,
        get: () => undefined,
      });
      activeTerminalRedefined = true;
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
    if (activeTerminalRedefined) {
      if (originalActiveTerminal) {
        Object.defineProperty(window, "activeTerminal", originalActiveTerminal);
      } else {
        delete (window as { activeTerminal?: unknown }).activeTerminal;
      }
    }
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
    await execute({ name: "Multi", script: ["a", "b", "c"] });
    assert.strictEqual(sequence, "a && b && c\r");
  });

  test("disableAutoRun inserts the command without running it (no carriage return)", async () => {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("script.disableAutoRun", true, ConfigurationTarget.Global);
    await execute({ name: "Solo", script: "echo hi" });
    assert.strictEqual(sequence, "echo hi");
  });
});

suite("getScriptsConfig", () => {
  suiteTeardown(async () => {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("scripts", undefined, ConfigurationTarget.Global);
  });

  test("keeps valid entries and drops malformed ones", async () => {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update(
        "scripts",
        [
          { name: "ok", script: "echo hi" },
          { name: "arr", script: ["a", "b"] },
          { name: "missingScript" },
          { script: "missingName" },
          "not an object",
          null,
          { name: 1, script: "badName" },
        ],
        ConfigurationTarget.Global,
      );
    assert.deepStrictEqual(getScriptsConfig(), [
      { name: "ok", script: "echo hi" },
      { name: "arr", script: ["a", "b"] },
    ]);
  });

  test("returns [] when scripts is unset", async () => {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("scripts", undefined, ConfigurationTarget.Global);
    assert.deepStrictEqual(getScriptsConfig(), []);
  });
});

suite("runScript routing", () => {
  const realShowQuickPick = window.showQuickPick;
  const realShowWarningMessage = window.showWarningMessage;
  const realExecuteCommand = commands.executeCommand;
  const realCreateTerminal = window.createTerminal;
  let sequence: string | undefined;
  let warning: string | undefined;

  suiteTeardown(async () => {
    (window as { showQuickPick: any }).showQuickPick = realShowQuickPick;
    (window as { showWarningMessage: any }).showWarningMessage =
      realShowWarningMessage;
    (commands as { executeCommand: any }).executeCommand = realExecuteCommand;
    (window as { createTerminal: any }).createTerminal = realCreateTerminal;
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("scripts", undefined, ConfigurationTarget.Global);
  });

  setup(() => {
    sequence = undefined;
    warning = undefined;
    (window as { createTerminal: any }).createTerminal = () => ({ show() {} });
    (window as { showWarningMessage: any }).showWarningMessage = (
      msg: string,
    ) => {
      warning = msg;
      return Promise.resolve(undefined);
    };
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

  async function setScripts(scripts: unknown[]) {
    await workspace
      .getConfiguration("terminalAllInOne")
      .update("scripts", scripts, ConfigurationTarget.Global);
  }

  test("a valid index runs that script", async () => {
    await setScripts([
      { name: "first", script: "echo one" },
      { name: "second", script: "echo two" },
    ]);
    await runScript(1);
    assert.strictEqual(sequence, "echo two\r");
  });

  test("an out-of-range index warns and runs nothing", async () => {
    await setScripts([{ name: "only", script: "echo one" }]);
    await runScript(5);
    assert.strictEqual(sequence, undefined);
    assert.strictEqual(warning, "No script has been defined for that index");
  });

  test("no scripts and no index warns", async () => {
    await setScripts([]);
    await runScript();
    assert.strictEqual(warning, "No scripts have been defined");
  });

  test("the picker runs the selected script", async () => {
    await setScripts([
      { name: "first", script: "echo one" },
      { name: "second", script: "echo two" },
    ]);
    (window as { showQuickPick: any }).showQuickPick = async (items: any[]) =>
      items[1];
    await runScript();
    assert.strictEqual(sequence, "echo two\r");
  });
});
