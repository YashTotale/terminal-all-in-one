import { workspace, ConfigurationTarget } from "vscode";
import { showError } from "../messages";

export const configuration = function (section?: string) {
  return workspace.getConfiguration(section);
};

interface GetConfig {
  config?: string;
  section: string;
}

export const getConfig = function ({ config, section }: GetConfig): any {
  return configuration(config).get(section);
};

interface UpdateConfig {
  config?: string;
  section: string;
  value: any;
}

export const updateConfig = function ({
  config,
  section,
  value,
}: UpdateConfig) {
  try {
    configuration(config).update(section, value, true);
  } catch (e) {
    showError(e instanceof Error ? e.message : String(e));
  }
};

export interface ScopedValue {
  target: ConfigurationTarget;
  value: any;
}

// Resolve the real scope a setting's value lives at (most specific wins). `value` is undefined when the setting is unset (i.e. on the default).
export const inspectScope = function (section: string): ScopedValue {
  const info = configuration().inspect(section);
  if (info?.workspaceFolderValue !== undefined) {
    return {
      target: ConfigurationTarget.WorkspaceFolder,
      value: info.workspaceFolderValue,
    };
  }
  if (info?.workspaceValue !== undefined) {
    return {
      target: ConfigurationTarget.Workspace,
      value: info.workspaceValue,
    };
  }
  return { target: ConfigurationTarget.Global, value: info?.globalValue };
};

export const writeScoped = function (
  section: string,
  value: any,
  target: ConfigurationTarget,
) {
  try {
    return configuration().update(section, value, target);
  } catch (e) {
    showError(e instanceof Error ? e.message : String(e));
    return undefined;
  }
};
