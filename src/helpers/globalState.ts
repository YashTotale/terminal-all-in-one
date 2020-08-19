import { ExtensionContext } from "vscode";

export default {
  update(context: ExtensionContext, key: string, value: any) {
    return context.globalState.update(key, value);
  },
  get(context: ExtensionContext, key: string) {
    return context.globalState.get(key);
  },
};
