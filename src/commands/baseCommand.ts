import {
  QuickPickItem,
  window,
  QuickPickOptions,
  ConfigurationChangeEvent,
} from "vscode";

import { EXTENSION_NAME } from "../helpers/constants";
import {
  getConfig,
  updateConfig,
  inspectScope,
  writeScoped,
} from "../helpers/config";
import debounce from "../helpers/debounce";

export default class BaseCommand {
  name: string;
  handlerFunc: (...params: any[]) => any;
  config?: (e: ConfigurationChangeEvent) => any;

  constructor(
    name: string,
    handlerFunc: (...params: any[]) => any,
    config?: (e: ConfigurationChangeEvent) => any,
  ) {
    this.name = name;
    this.handlerFunc = handlerFunc;
    this.config = config;
  }

  getExtensionName() {
    return EXTENSION_NAME;
  }

  getExtensionConfig(property: string) {
    return getConfig({ config: this.getExtensionName(), section: property });
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

  async showQuickPick<T extends QuickPickItem>(
    items: T[],
    options: QuickPickOptions,
    onSelect: (selectedItem: T) => any,
    onNoSelect?: () => any,
  ) {
    const selectedItem = await window.showQuickPick<T>(items, {
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

  // Preview a setting on quick-pick hover, then persist on accept or restore the captured original on cancel/Escape/hide/error. Reads/writes at the value's real scope so we never shadow a workspace setting with a global one.
  async livePreview<T extends QuickPickItem>({
    section,
    items,
    toValue,
    options,
  }: {
    section: string;
    items: T[];
    toValue: (item: T) => any;
    options?: QuickPickOptions;
  }) {
    const original = inspectScope(section);
    const preview = debounce((item: T) => {
      writeScoped(section, toValue(item), original.target);
    }, 300);
    let picked: T | undefined;
    try {
      picked = await window.showQuickPick<T>(items, {
        matchOnDescription: true,
        matchOnDetail: true,
        ...options,
        onDidSelectItem: (item) => preview(item as T),
      });
      if (picked) {
        await writeScoped(section, toValue(picked), original.target);
      }
    } finally {
      preview.cancel();
      if (!picked) {
        await writeScoped(section, original.value, original.target);
      }
    }
    return picked;
  }
}
