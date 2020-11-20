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
  name: string;
  handlerFunc: (...params: any[]) => any;
  config?: (e: ConfigurationChangeEvent) => any;

  constructor(
    name: string,
    handlerFunc: (...params: any[]) => any,
    config?: (e: ConfigurationChangeEvent) => any
  ) {
    this.name = name;
    this.handlerFunc = handlerFunc;
    this.config = config;
  }

  getExtensionName() {
    return EXTENSION_NAME;
  }

  getExtensionNameWithPublisher() {
    return EXTENSION_NAME_W_PUBLISHER;
  }

  getReadableExtensionName() {
    return READABLE_EXTENSION_NAME;
  }

  showMessage(
    message: keyof typeof messages,
    params?: Parameters<typeof messages[typeof message]>[0],
    params1?: Parameters<typeof messages[typeof message]>[1]
  ) {
    showMessage(message, params, params1);
  }

  getExtensionConfig(property: string) {
    return getConfig({
      config: this.getExtensionName(),
      section: property,
    });
  }

  updateExtensionConfig({ key, value }: { key: string; value: any }) {
    return updateConfig({
      config: this.getExtensionName(),
      section: key,
      value,
    });
  }

  getConfig(property: string) {
    return getConfig({ section: property });
  }

  updateConfig({ key, value }: { key: string; value: any }) {
    return updateConfig({ section: key, value });
  }

  async showQuickPick(
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

  clearTerminal() {
    return commands.executeCommand(`${this.getExtensionName()}.clearTerminal`);
  }

  focusTerminal() {
    commands.executeCommand("workbench.action.terminal.focus");
  }
}
