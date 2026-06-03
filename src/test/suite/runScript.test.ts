import assert from "assert";
import { window, commands } from "vscode";
import { execute, runScript, getScriptsConfig } from "../../commands/runScript";
import { stub, globalSetting } from "./helpers";

suite("runScript execute", () => {
  const realCreateTerminal = window.createTerminal;
  const realExecuteCommand = commands.executeCommand;
  const autoRun = globalSetting<boolean>(
    "script.disableAutoRun",
    "terminalAllInOne",
  );
  let sequence: string | undefined;
  let originalActiveTerminal: PropertyDescriptor | undefined;
  let activeTerminalRedefined = false;

  suiteSetup(() => {
    autoRun.capture();
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
    stub(window, "createTerminal", realCreateTerminal);
    stub(commands, "executeCommand", realExecuteCommand);
    if (activeTerminalRedefined) {
      if (originalActiveTerminal) {
        Object.defineProperty(window, "activeTerminal", originalActiveTerminal);
      } else {
        delete (window as { activeTerminal?: unknown }).activeTerminal;
      }
    }
    await autoRun.restore();
  });

  setup(() => {
    sequence = undefined;
    stub(window, "createTerminal", () => ({ show() {} }) as never);
    stub(
      commands,
      "executeCommand",
      (command: string, args?: { text?: string }) => {
        if (command === "workbench.action.terminal.sendSequence") {
          sequence = args?.text;
        }
        return Promise.resolve();
      },
    );
  });

  test("joins array commands with && and runs them (trailing carriage return)", async () => {
    await autoRun.set(false);
    await execute({ name: "Multi", script: ["a", "b", "c"] });
    assert.strictEqual(sequence, "a && b && c\r");
  });

  test("disableAutoRun inserts the command without running it (no carriage return)", async () => {
    await autoRun.set(true);
    await execute({ name: "Solo", script: "echo hi" });
    assert.strictEqual(sequence, "echo hi");
  });
});

suite("getScriptsConfig", () => {
  const scripts = globalSetting<unknown[]>("scripts", "terminalAllInOne");

  suiteTeardown(() => scripts.set(undefined));

  test("keeps valid entries and drops malformed ones", async () => {
    await scripts.set([
      { name: "ok", script: "echo hi" },
      { name: "arr", script: ["a", "b"] },
      { name: "missingScript" },
      { script: "missingName" },
      "not an object",
      null,
      { name: 1, script: "badName" },
    ]);
    assert.deepStrictEqual(getScriptsConfig(), [
      { name: "ok", script: "echo hi" },
      { name: "arr", script: ["a", "b"] },
    ]);
  });

  test("returns [] when scripts is unset", async () => {
    await scripts.set(undefined);
    assert.deepStrictEqual(getScriptsConfig(), []);
  });
});

suite("runScript routing", () => {
  const realShowQuickPick = window.showQuickPick;
  const realShowWarningMessage = window.showWarningMessage;
  const realExecuteCommand = commands.executeCommand;
  const realCreateTerminal = window.createTerminal;
  const scripts = globalSetting<unknown[]>("scripts", "terminalAllInOne");
  let sequence: string | undefined;
  let warning: string | undefined;

  suiteTeardown(async () => {
    stub(window, "showQuickPick", realShowQuickPick);
    stub(window, "showWarningMessage", realShowWarningMessage);
    stub(commands, "executeCommand", realExecuteCommand);
    stub(window, "createTerminal", realCreateTerminal);
    await scripts.set(undefined);
  });

  setup(() => {
    sequence = undefined;
    warning = undefined;
    stub(window, "createTerminal", () => ({ show() {} }));
    stub(window, "showWarningMessage", (msg: string) => {
      warning = msg;
      return Promise.resolve(undefined);
    });
    stub(
      commands,
      "executeCommand",
      (command: string, args?: { text?: string }) => {
        if (command === "workbench.action.terminal.sendSequence") {
          sequence = args?.text;
        }
        return Promise.resolve();
      },
    );
  });

  test("a valid index runs that script", async () => {
    await scripts.set([
      { name: "first", script: "echo one" },
      { name: "second", script: "echo two" },
    ]);
    await runScript(1);
    assert.strictEqual(sequence, "echo two\r");
  });

  test("an out-of-range index warns and runs nothing", async () => {
    await scripts.set([{ name: "only", script: "echo one" }]);
    await runScript(5);
    assert.strictEqual(sequence, undefined);
    assert.strictEqual(warning, "No script has been defined for that index");
  });

  test("no scripts and no index warns", async () => {
    await scripts.set([]);
    await runScript();
    assert.strictEqual(warning, "No scripts have been defined");
  });

  test("the picker runs the selected script", async () => {
    await scripts.set([
      { name: "first", script: "echo one" },
      { name: "second", script: "echo two" },
    ]);
    stub(window, "showQuickPick", async (items: any[]) => items[1]);
    await runScript();
    assert.strictEqual(sequence, "echo two\r");
  });
});
