const vscode = require("vscode");

function getConfig() {
  return vscode.workspace.getConfiguration();
}

/**
 * @param {string} key
 * @param {any} value
 */
async function updateConfig(key, value, shouldApplyGlobally = true) {
  try {
    await getConfig().update(key, value, shouldApplyGlobally);
  } catch ({ message }) {
    return vscode.window.showErrorMessage(message);
  }
}

module.exports = {
  getConfig,
  updateConfig,
};
