// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.deactivate = exports.activate = void 0;

const vscode = require("vscode");
// @ts-ignore
const themes = require("./themes.json");
const themeNames = themes.map((theme) => theme.name);
const themeSchemes = themes.map((theme) => theme.colors);
const showMessage = require("./messages").showMessage;

const EXTENSION_NAME = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";
const COLORS_CONFIG = "workbench.colorCustomizations";

function showOnStartMessage(context) {
  if (!context.globalState.get("informationMessageShown")) {
    showMessage("onstart", {
      onselection: () => {
        context.globalState.update("informationMessageShown", true);
      },
    });
  }
}

async function chooseTerminalTheme() {
  const currentStyles = await getConfig(COLORS_CONFIG);
  await vscode.window.showQuickPick(themeNames, {
    placeHolder: "Choose a Terminal Theme",
    canPickMany: false,
    ignoreFocusOut: true,
    onDidSelectItem: async (themeName) => {
      updateTerminalTheme(themeName);
    },
  });
}

async function updateTerminalTheme(themeName) {
  //Check if theme exists and set the index of it
  let themeIndex = 0;
  const /**
     * @param {string} name
     * @param {number} i
     */
    themeExists = themeNames.some((name, i) => {
      if (name === themeName) {
        themeIndex = i;
        return true;
      }
      return false;
    });
  if (!themeExists) {
    //If the theme doesn't exist, show an error message
    showMessage("themeDoesNotExist");
  } else {
    //If the theme does exist, set the new colors
    const themeScheme = themeSchemes[themeIndex];
    updateConfig(COLORS_CONFIG, themeScheme);
  }
}

function getConfig(key) {
  return vscode.workspace.getConfiguration().get(key);
}

async function updateConfig(key, value) {
  try {
    await vscode.workspace.getConfiguration().update(key, value);
  } catch ({ message }) {
    return vscode.window.showErrorMessage(message);
  }
}

function registerCommand({ name, handler }) {
  return vscode.commands.registerCommand(name, handler);
}

function createCommands(context) {
  const commands = [
    {
      name: "terminalAllInOne.toggleMaxTerm",
      handler: () => {
        vscode.commands.executeCommand("workbench.action.terminal.focus");
        vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
      },
    },
    {
      name: "terminalAllInOne.chooseTerminalTheme",
      handler: chooseTerminalTheme,
    },
  ];

  context.subscriptions.push(commands.map(registerCommand));
}

function activate(context) {
  showOnStartMessage(context);
  createCommands(context);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
