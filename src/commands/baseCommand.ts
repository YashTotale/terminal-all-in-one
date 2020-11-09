import {
  QuickPickItem,
  window,
  QuickPickOptions,
  commands,
  ConfigurationChangeEvent,
} from "vscode";

import {
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
  READABLE_EXTENSION_NAME,
} from "../helpers/constants";
import { getConfig, updateConfig } from "../helpers/config";
import showMessage, { messages } from "../messages";

export default class BaseCommand {
  constructor(
    name: string,
    handler: (...params: any[]) => any,
    config?: (e: ConfigurationChangeEvent) => any
  ) {
    this.name = name;
    this.handler = handler;
    this.config = config;
  }
  name: string;
  handler: (...params: any[]) => any;
  config: ((e: ConfigurationChangeEvent) => any) | undefined;

  static getExtensionName() {
    return EXTENSION_NAME;
  }

  static getExtensionNameWithPublisher() {
    return EXTENSION_NAME_W_PUBLISHER;
  }

  static getReadableExtensionName() {
    return READABLE_EXTENSION_NAME;
  }

  static showMessage(
    message: keyof typeof messages,
    params?: Parameters<typeof messages[typeof message]>[0],
    params1?: Parameters<typeof messages[typeof message]>[1]
  ) {
    showMessage(message, params, params1);
  }

  static getExtensionConfig(property: string) {
    return getConfig({
      config: BaseCommand.getExtensionName(),
      section: property,
    });
  }

  static updateExtensionConfig({ key, value }: { key: string; value: any }) {
    return updateConfig({
      config: BaseCommand.getExtensionName(),
      section: key,
      value,
    });
  }

  static getConfig(property: string) {
    return getConfig({ section: property });
  }

  static updateConfig({ key, value }: { key: string; value: any }) {
    return updateConfig({ section: key, value });
  }

  static async showQuickPick(
    items: QuickPickItem[],
    options: QuickPickOptions,
    onSelect: (selectedItem: QuickPickItem) => any,
    onNoSelect?: () => any
  ) {
    const selectedItem = await window.showQuickPick(items, {
      matchOnDescription: true,
      matchOnDetail: true,
      canPickMany: false,
      ignoreFocusOut: false,
      placeHolder: "Choose an item",
      ...options,
    });

    if (!selectedItem) {
      onNoSelect?.();
    } else {
      onSelect(selectedItem);
    }
  }

  static clearTerminal() {
    return commands.executeCommand(
      `${BaseCommand.getExtensionName()}.clearTerminal`
    );
  }

  static focusTerminal() {
    commands.executeCommand("workbench.action.terminal.focus");
  }
}
