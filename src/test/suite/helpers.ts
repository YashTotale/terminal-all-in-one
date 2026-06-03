import { workspace, ConfigurationTarget } from "vscode";

export const tick = () => new Promise((r) => setTimeout(r, 100));

// Overwrite a readonly method with a stub; pass the saved original back to restore.
export function stub<T, K extends keyof T>(
  obj: T,
  key: K,
  impl: unknown,
): void {
  (obj as Record<K, unknown>)[key] = impl;
}

// A global-scoped setting: capture the original (suiteSetup), set/read it, restore (suiteTeardown).
export function globalSetting<T>(section: string, config?: string) {
  const cfg = () => workspace.getConfiguration(config);
  let original: T | undefined;
  return {
    capture: () => {
      original = cfg().inspect(section)?.globalValue as T | undefined;
    },
    value: () => cfg().inspect(section)?.globalValue as T | undefined,
    set: (value: T | undefined) =>
      cfg().update(section, value, ConfigurationTarget.Global),
    restore: () => cfg().update(section, original, ConfigurationTarget.Global),
  };
}
