const vscode = require("vscode");

function getConfig() {
  return vscode.workspace.getConfiguration();
}

async function updateConfig(key, value, shouldApplyGlobally = true) {
  try {
    return await getConfig().update(key, value, shouldApplyGlobally);
  } catch (error) {
    const { message } = error;
    return vscode.window.showErrorMessage(message);
  }
}

module.exports = {
  getConfig,
  updateConfig,
};
