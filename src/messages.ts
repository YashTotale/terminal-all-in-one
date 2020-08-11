import { window, commands, env, ExtensionContext, Uri } from "vscode";
import { getConfig, updateConfig } from "./helpers/config";
import {
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
  READABLE_EXTENSION_NAME,
} from "./helpers/constants";

const TERMINAL_MESSAGES_CONFIG = `${EXTENSION_NAME}.messages`;

const DONT_SHOW = "Don't Show Again";

function getMessagesConfig(key: string) {
  return getConfig({ config: TERMINAL_MESSAGES_CONFIG, section: key });
}

async function infoWithDisableOption(configProperty: string, info: string) {
  if (getMessagesConfig(configProperty)) {
    const selection = await window.showInformationMessage(info, DONT_SHOW);
    if (selection === DONT_SHOW) {
      await updateMessagesConfig(configProperty, false);
    }
  }
}

async function updateMessagesConfig(key: string, value: any) {
  updateConfig({
    section: TERMINAL_MESSAGES_CONFIG,
    value: {
      ...getConfig({ section: TERMINAL_MESSAGES_CONFIG }),
      [key]: value,
    },
  });
}

interface messages {
  onstart: Function;
  themeQuickPickOpened: Function;
  themeDoesNotExist: Function;
  themeSelected: Function;
  fontSizeQuickPickOpened: Function;
  fontSizeSelected: Function;
  noScripts: Function;
  disableScriptDescription: Function;
  error: Function;
}

export const messages: messages = {
  // Message on start
  onstart: async (context: ExtensionContext) => {
    const STATE_PROPERTY = "shouldNotShowOnStartMessage";
    if (!context.globalState.get(STATE_PROPERTY)) {
      const selection = await window.showInformationMessage(
        `Thanks for installing ${READABLE_EXTENSION_NAME}. Check out our README for more information on the extension.`,
        "README"
      );
      context.globalState.update(STATE_PROPERTY, true);
      if (selection === "README") {
        commands.executeCommand("extension.open", EXTENSION_NAME_W_PUBLISHER);
      }
    }
  },
  //Message when the theme quick pick is opened
  themeQuickPickOpened: async () => {
    await infoWithDisableOption(
      "shouldShowThemeQuickPickMessage",
      "Open the terminal to see a live preview"
    );
  },
  //Message when a theme that does not exist is chosen
  themeDoesNotExist: async () => {
    const selection = await window.showErrorMessage(
      "That theme doesn't seem to exist. Please open a new issue in the github repository if this theme does exist.",
      "Issues Page"
    );
    if (selection === "Issues Page") {
      env.openExternal(
        Uri.parse("https://github.com/YashTotale/terminal-all-in-one/issues")
      );
    }
  },
  //Message when a theme is selected
  themeSelected: async (selectedTheme: string) => {
    infoWithDisableOption(
      "shouldShowSelectedThemeMessage",
      `"${selectedTheme}" has been applied`
    );
  },
  //Message when the font size quick pick is opened
  fontSizeQuickPickOpened: async () => {
    infoWithDisableOption(
      "shouldShowFontSizeQuickPickMessage",
      "Open the terminal for a live preview. If a terminal was already open and you cannot see your previous commands, scroll up in the terminal."
    );
  },
  fontSizeSelected: async (selectedSize: string) => {
    infoWithDisableOption(
      "shouldShowSelectedFontSizeMessage",
      `Font Size "${selectedSize}" has been applied`
    );
  },
  noScripts: async (index: number) => {
    const message =
      typeof index === "number"
        ? "No script has been defined for that index"
        : "No scripts have been defined";
    const selection = await window.showWarningMessage(
      message,
      "Settings",
      "Scripts Explained"
    );
    if (selection === "Settings") {
      return commands.executeCommand("workbench.action.openSettingsJson");
    }
    if (selection === "Scripts Explained") {
      return env.openExternal(
        Uri.parse(
          "https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one#scripts"
        )
      );
    }
  },
  disableScriptDescription: async (disable: Function) => {
    const CONFIG_PROPERTY = "shouldShowDisableScriptDescriptionMessage";
    const DISABLE = "Disable";
    if (getMessagesConfig(CONFIG_PROPERTY)) {
      const selection = await window.showInformationMessage(
        "You can disable the script description",
        DONT_SHOW,
        DISABLE
      );
      if (selection === DONT_SHOW) {
        await updateMessagesConfig(CONFIG_PROPERTY, false);
      }
      if (selection === DISABLE) {
        return disable();
      }
    }
  },
  error: async (message: string) => {
    window.showErrorMessage(message);
  },
};

const showMessage = function (id: keyof typeof messages, params?: any): void {
  const shouldShow = !getConfig({
    section: `${EXTENSION_NAME}.disableAllMessages`,
  });
  if (shouldShow) {
    const messageToShow = messages[id];
    messageToShow(params);
  }
};

export default showMessage;
