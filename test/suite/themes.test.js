const assert = require("assert");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const themes = require("../../src/themes.json");
// const myExtension = require('../extension');

suite("Themes Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Themes object exists", () => {
    assert.ok(themes, "Themes object exists");
  });

  test("Themes object has keys", () => {
    assert.ok(themes.length, "Themes object has objects");
  });

  test("Theme has correct keys", () => {
    for (const themeName in themes) {
      const themeKeys = Object.keys(themes[themeName]);
      const keys = ["name", "colors"];

      assert.deepStrictEqual(
        keys.length,
        themeKeys.length,
        "Theme object has correct number of keys"
      );

      keys.forEach((key) => {
        assert.ok(
          themeKeys.some((themeKey) => themeKey === key),
          "Theme object has correct key"
        );
      });
    }
  });

  return undefined;
});
