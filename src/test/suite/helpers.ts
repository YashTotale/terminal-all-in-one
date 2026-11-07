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

export function globalSetting<T>(section: string, config?: string) {
  return scopedSetting<T>(section, ConfigurationTarget.Global, config);
}

/** Capture, read, and restore the raw value at one settings scope. */
export function scopedSetting<T>(
  section: string,
  target: ConfigurationTarget.Global | ConfigurationTarget.Workspace,
  config?: string,
) {
  const cfg = () => workspace.getConfiguration(config);
  const value = () => {
    const info = cfg().inspect<T>(section);
    return target === ConfigurationTarget.Workspace
      ? info?.workspaceValue
      : info?.globalValue;
  };
  let original: T | undefined;
  return {
    capture: () => {
      original = value();
    },
    value,
    set: (value: T | undefined) => cfg().update(section, value, target),
    restore: () => cfg().update(section, original, target),
  };
}
