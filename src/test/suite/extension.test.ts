import assert from "assert";
import { window } from "vscode";
import { activate, deactivate } from "../../extension";

suite("Extension Test Suite", () => {
  window.showInformationMessage("Start all tests.");

  assert.ok(activate, "Activate Function exists");

  assert.ok(deactivate, "Deactivate Function exists");
});
