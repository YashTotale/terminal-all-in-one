import { workspace } from "vscode";
import showMessage from "../messages";

export const configuration = function (section: string | undefined) {
  return workspace.getConfiguration(section);
};

interface getConfig {
  config?: string;
  section: string;
}

export const getConfig = function ({ config, section }: getConfig): any {
  return configuration(config).get(section);
};

interface updateConfig {
  config?: string;
  section: string;
  value: any;
}

export const updateConfig = function ({
  config,
  section,
  value,
}: updateConfig) {
  try {
    configuration(config).update(section, value, true);
  } catch ({ message }) {
    showMessage("error", message);
  }
};
