import assert from "assert";
import { commands, extensions } from "vscode";
import {
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
} from "../../helpers/constants";
import commandList from "../../commands";

suite("manifest ↔ registration parity", () => {
  const extension = extensions.getExtension(EXTENSION_NAME_W_PUBLISHER);
  let manifest: any;
  let registered: string[];

  suiteSetup(async () => {
    await extension?.activate();
    manifest = extension?.packageJSON;
    registered = await commands.getCommands(true);
  });

  test("the extension is discoverable in the test host", () => {
    assert.ok(extension, `${EXTENSION_NAME_W_PUBLISHER} not found`);
  });

  test("the command table matches contributes.commands exactly", () => {
    const manifestIds = manifest.contributes.commands
      .map((c: { command: string }) => c.command)
      .sort();
    const tableIds = commandList
      .map((c) => `${EXTENSION_NAME}.${c.name}`)
      .sort();
    assert.deepStrictEqual(tableIds, manifestIds);
  });

  test("every contributed command ID is registered", () => {
    for (const { command } of manifest.contributes.commands) {
      assert.ok(registered.includes(command), `${command} not registered`);
    }
  });

  test("every keybinding references a registered command", () => {
    for (const { command } of manifest.contributes.keybindings) {
      assert.ok(registered.includes(command), `${command} not registered`);
    }
  });
});

suite("passthrough commands", () => {
  const realExecuteCommand = commands.executeCommand;
  let calls: string[];

  suiteTeardown(() => {
    (commands as { executeCommand: any }).executeCommand = realExecuteCommand;
  });

  setup(() => {
    calls = [];
    (commands as { executeCommand: any }).executeCommand = (cmd: string) => {
      calls.push(cmd);
      return Promise.resolve();
    };
  });

  test("a single-command passthrough runs its built-in", async () => {
    await commandList.find((c) => c.name === "splitTerminal")!.handler();
    assert.deepStrictEqual(calls, ["workbench.action.terminal.split"]);
  });

  test("an array passthrough runs each built-in in order", async () => {
    await commandList.find((c) => c.name === "toggleMaxTerm")!.handler();
    assert.deepStrictEqual(calls, [
      "workbench.action.terminal.focus",
      "workbench.action.toggleMaximizedPanel",
    ]);
  });
});
