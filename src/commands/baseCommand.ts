import { QuickPickItem, window, QuickPickOptions } from "vscode";

import {
  EXTENSION_NAME,
  EXTENSION_NAME_W_PUBLISHER,
  READABLE_EXTENSION_NAME,
} from "../helpers/constants";
import { getConfig, updateConfig } from "../helpers/config";
import showMessage, { messages } from "../messages";

export default class BaseCommand {
  constructor(name: string, handler: () => any) {
    this.name = name;
    this.handler = handler;
  }
  name: string;
  handler: () => any;

  static getExtensionName() {
    return EXTENSION_NAME;
  }

  static getExtensionNameWithPublisher() {
    return EXTENSION_NAME_W_PUBLISHER;
  }

  static getReadableExtensionName() {
    return READABLE_EXTENSION_NAME;
  }

  static showMessage(message: keyof typeof messages, params?: any) {
    showMessage(message, params);
  }

  static getExtensionConfig(property: string) {
    return getConfig({ config: "terminalAllInOne", section: property });
  }

  static updateExtensionConfig({ key, value }: { key: string; value: any }) {
    return updateConfig({ config: "terminalAllInOne", section: key, value });
  }

  static async showQuickPick(
    items: QuickPickItem[],
    options: QuickPickOptions,
    onSelect: (selectedItem: QuickPickItem) => {},
    cleanUp?: () => {}
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
      cleanUp?.();
      return;
    }

    onSelect(selectedItem);
  }
}
