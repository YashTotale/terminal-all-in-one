const assert = require("assert");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
//
const {
  activate,
  deactivate,
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
  READABLE_EXTENSION_NAME,
} = require("../../src/extension.js");
// const myExtension = require('../extension');

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  assert.ok(EXTENSION_NAME, "EXTENSION_NAME exists");

  assert.ok(EXTENSION_NAME_W_PUBLISHER, "EXTENSION_NAME_W_PUBLISHER exists");

  assert.ok(READABLE_EXTENSION_NAME, "READABLE_EXTENSION_NAME exists");

  assert.ok(activate, "Activate Function exists");

  assert.ok(deactivate, "Deactivate Function exists");
});
