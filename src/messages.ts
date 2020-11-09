import { window, commands, env, Uri, ExtensionContext } from "vscode";
import { getConfig, updateConfig } from "./helpers/config";
import {
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
  READABLE_EXTENSION_NAME,
  stateProps,
} from "./helpers/constants";
import state from "./helpers/globalState";

const TERMINAL_MESSAGES_CONFIG = `${EXTENSION_NAME}.messages`;

const DONT_SHOW = "Don't Show Again";

function getMessagesConfig(key: string) {
  return getConfig({ config: TERMINAL_MESSAGES_CONFIG, section: key });
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

async function infoWithDisableOption(
  configProperty: string,
  info: string,
  ...rest: { message: string; func: () => any }[]
) {
  if (getMessagesConfig(configProperty)) {
    const selection = await window.showInformationMessage(
      info,
      DONT_SHOW,
      ...rest.map((r) => r.message)
    );
    if (selection === DONT_SHOW) {
      await updateMessagesConfig(configProperty, false);
    }
    rest.forEach((r) => {
      if (selection === r.message) r.func();
    });
  }
}

interface messages {
  onFirstStart: () => any;
  followUp: (context: ExtensionContext) => any;
  themeQuickPickOpened: () => any;
  themeDoesNotExist: () => any;
  themeSelected: (selectedTheme: string) => any;
  fontSizeQuickPickOpened: (open: () => any) => any;
  fontSizeSelected: (selectedSize: string, undo: () => any) => any;
  cursorWidthQuickPickOpened: (open: () => any) => any;
  cursorWidthSelected: (selectedWidth: string, undo: () => any) => any;
  noScripts: (index: number) => any;
  disableScriptDescription: (disable: () => any) => any;
  error: (message: string) => any;
}

export const messages: messages = {
  // Message on start
  onFirstStart: async () => {
    const selection = await window.showInformationMessage(
      `Thanks for installing ${READABLE_EXTENSION_NAME}. Check out our README for more information on the extension.`,
      "README"
    );
    if (selection === "README") {
      commands.executeCommand("extension.open", EXTENSION_NAME_W_PUBLISHER);
    }
  },
  //Message to follow up with users after a certain time
  followUp: async (context: ExtensionContext) => {
    const selection = await window.showInformationMessage(
      `You've been using ${READABLE_EXTENSION_NAME} for some time. I hope it's been useful. Would you mind giving it a quick rating?`,
      DONT_SHOW,
      "No Problem!"
    );
    if (selection === "No Problem!") {
      env.openExternal(
        Uri.parse(
          `https://marketplace.visualstudio.com/items?itemName=${EXTENSION_NAME_W_PUBLISHER}&ssr=false#review-details`
        )
      );
      state.update(context, stateProps.SHOULD_NOT_SHOW_FOLLOW_UP, true);
    } else if (selection === DONT_SHOW) {
      state.update(context, stateProps.SHOULD_NOT_SHOW_FOLLOW_UP, true);
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
  fontSizeQuickPickOpened: async (open: () => any) => {
    infoWithDisableOption(
      "shouldShowFontSizeQuickPickMessage",
      "Open the terminal for a live preview. If a terminal was already open and you cannot see your previous commands, scroll up in the terminal.",
      {
        message: "Open",
        func: open,
      }
    );
  },
  fontSizeSelected: async (selectedSize: string, undo: () => any) => {
    infoWithDisableOption(
      "shouldShowSelectedFontSizeMessage",
      `Font Size "${selectedSize}" has been applied`,
      {
        message: "Undo",
        func: undo,
      }
    );
  },
  //Messages when the cursor width quick pick is opened
  cursorWidthQuickPickOpened: async (open: () => any) => {
    infoWithDisableOption(
      "shouldShowCursorWidthQuickPickMessage",
      "Open the terminal for a live preview",
      {
        message: "Open",
        func: open,
      }
    );
  },
  cursorWidthSelected: async (selectedWidth: string, undo: () => any) => {
    infoWithDisableOption(
      "shouldShowSelectedCursorWidthMessage",
      `Cursor Width "${selectedWidth}" has been applied`,
      {
        message: "Undo",
        func: undo,
      }
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
          "https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one#scripts-1"
        )
      );
    }
  },
  disableScriptDescription: async (disable: () => any) => {
    infoWithDisableOption(
      "shouldShowDisableScriptDescriptionMessage",
      "You can disable the script description",
      {
        message: "Disable",
        func: disable,
      }
    );
  },
  error: async (message: string) => {
    window.showErrorMessage(message);
  },
};

const showMessage = function (
  id: keyof typeof messages,
  params?: Parameters<messages[typeof id]>[0],
  params1?: Parameters<messages[typeof id]>[1]
): void {
  const shouldShow = !getConfig({
    section: `${EXTENSION_NAME}.disableAllMessages`,
  });
  if (shouldShow) {
    const messageToShow = messages[id];
    //@ts-ignore
    messageToShow(params, params1);
  }
};

export default showMessage;
