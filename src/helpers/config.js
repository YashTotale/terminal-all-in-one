const vscode = require("vscode");
const messages = require("../messages");

const configuration = function (section) {
  return vscode.workspace.getConfiguration(section);
};

const getConfig = function ({ config, section }) {
  return configuration(config).get(section);
};

const updateConfig = function ({ config, section, value }) {
  try {
    return config
      ? config.update(section, value, true)
      : configuration().update(section, value, true);
  } catch ({ message }) {
    messages.showMessage("error", message);
  }
};

module.exports = { config: configuration, getConfig, updateConfig };
