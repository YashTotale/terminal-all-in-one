const vscode = require("vscode");

const configuration = function (section) {
  return vscode.workspace.getConfiguration(section);
};

const getConfig = function ({ config, section }) {
  return config ? config.get(section) : configuration().get(section);
};

const updateConfig = function ({ config, section, value }) {
  try {
    return config
      ? config.update(section, value, true)
      : configuration().update(section, value, true);
  } catch ({ message }) {
    return vscode.window.showErrorMessage(message);
  }
};

module.exports = { config: configuration, getConfig, updateConfig };
