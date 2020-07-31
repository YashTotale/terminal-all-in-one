const assert = require("assert");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
// @ts-ignore
const themes = require("../../src/themes.json");
// const myExtension = require('../extension');

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Themes", () => {
    // @ts-ignore
    assert.ok(themes, "Themes object exists");
    // @ts-ignore
    assert.ok(themes.length, "Themes object has objects");

    // for (const themeName in themes) {
    //   const themeKeys = Object.keys(themes[themeName]);

    // }
  });

  return;
});
