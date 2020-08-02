// @ts-nocheck
const assert = require("assert");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// @ts-ignore
const { activate, deactivate } = require("../../src/extension.js");
// const myExtension = require('../extension');

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  return undefined;
});
