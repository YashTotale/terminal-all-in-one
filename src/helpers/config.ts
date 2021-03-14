import { workspace } from "vscode";
import showMessage from "../messages";

export const configuration = function (section: string | undefined) {
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
  } catch ({ message }) {
    showMessage("error", message);
  }
};
